#!/usr/bin/env python3
"""
Plan de Acción para la Expansión de Nexo Studio — PDF Generator
"""

import os, sys, hashlib
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, cm, mm
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY, TA_RIGHT
from reportlab.lib import colors
from reportlab.platypus import (
    Paragraph, Spacer, Table, TableStyle, PageBreak, CondPageBreak,
    KeepTogether, Image, HRFlowable
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.platypus import SimpleDocTemplate
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# ── Font Registration ──
pdfmetrics.registerFont(TTFont('SarasaMonoSC', '/usr/share/fonts/truetype/chinese/SarasaMonoSC-Regular.ttf'))
pdfmetrics.registerFont(TTFont('LiberationSerif', '/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf'))
pdfmetrics.registerFont(TTFont('LiberationSerif-Bold', '/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf'))
pdfmetrics.registerFont(TTFont('LiberationSans', '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf'))
pdfmetrics.registerFont(TTFont('LiberationSans-Bold', '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans', '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'))

registerFontFamily('LiberationSerif', normal='LiberationSerif', bold='LiberationSerif-Bold')
registerFontFamily('LiberationSans', normal='LiberationSans', bold='LiberationSans-Bold')

# ── Color Palette (cascade auto-generated) ──
PAGE_BG       = colors.HexColor('#f2f2f0')
SECTION_BG    = colors.HexColor('#f0f0ee')
CARD_BG       = colors.HexColor('#f1f0ec')
TABLE_STRIPE  = colors.HexColor('#f2f2f0')
HEADER_FILL   = colors.HexColor('#716543')
COVER_BLOCK   = colors.HexColor('#8a7c54')
BORDER        = colors.HexColor('#cbc4af')
ICON          = colors.HexColor('#a8914d')
ACCENT        = colors.HexColor('#2d8fb0')
ACCENT_2      = colors.HexColor('#41ad41')
TEXT_PRIMARY   = colors.HexColor('#252421')
TEXT_MUTED     = colors.HexColor('#77756e')
SEM_SUCCESS   = colors.HexColor('#3d7650')
SEM_WARNING   = colors.HexColor('#937539')
SEM_ERROR     = colors.HexColor('#9a4740')
SEM_INFO      = colors.HexColor('#5d7e9f')

# ── Page dimensions ──
PAGE_W, PAGE_H = A4
LEFT_MARGIN = 1.8 * cm
RIGHT_MARGIN = 1.8 * cm
TOP_MARGIN = 2.0 * cm
BOTTOM_MARGIN = 2.0 * cm
CONTENT_W = PAGE_W - LEFT_MARGIN - RIGHT_MARGIN

# ── Styles ──
FONT_BODY = 'LiberationSans'
FONT_HEAD = 'LiberationSerif'

style_h1 = ParagraphStyle(
    name='H1', fontName=FONT_HEAD, fontSize=20, leading=26,
    textColor=TEXT_PRIMARY, spaceBefore=18, spaceAfter=10,
)
style_h2 = ParagraphStyle(
    name='H2', fontName=FONT_HEAD, fontSize=15, leading=20,
    textColor=ACCENT, spaceBefore=14, spaceAfter=8,
)
style_h3 = ParagraphStyle(
    name='H3', fontName=FONT_HEAD, fontSize=12, leading=16,
    textColor=HEADER_FILL, spaceBefore=10, spaceAfter=6,
)
style_body = ParagraphStyle(
    name='Body', fontName=FONT_BODY, fontSize=10.5, leading=17,
    textColor=TEXT_PRIMARY, alignment=TA_JUSTIFY,
    spaceBefore=2, spaceAfter=6,
)
style_body_left = ParagraphStyle(
    name='BodyLeft', fontName=FONT_BODY, fontSize=10.5, leading=17,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT,
    spaceBefore=2, spaceAfter=6,
)
style_bullet = ParagraphStyle(
    name='Bullet', fontName=FONT_BODY, fontSize=10.5, leading=17,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT,
    leftIndent=18, spaceBefore=1, spaceAfter=3,
    bulletIndent=6, bulletFontSize=10,
)
style_callout = ParagraphStyle(
    name='Callout', fontName=FONT_BODY, fontSize=11, leading=17,
    textColor=ACCENT, alignment=TA_LEFT,
    spaceBefore=8, spaceAfter=8,
    leftIndent=14, borderPadding=8,
)
style_table_header = ParagraphStyle(
    name='TH', fontName=FONT_HEAD, fontSize=10, leading=14,
    textColor=colors.white, alignment=TA_CENTER,
)
style_table_cell = ParagraphStyle(
    name='TC', fontName=FONT_BODY, fontSize=9.5, leading=14,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT,
)
style_table_cell_c = ParagraphStyle(
    name='TCC', fontName=FONT_BODY, fontSize=9.5, leading=14,
    textColor=TEXT_PRIMARY, alignment=TA_CENTER,
)
style_caption = ParagraphStyle(
    name='Caption', fontName=FONT_BODY, fontSize=9, leading=13,
    textColor=TEXT_MUTED, alignment=TA_CENTER,
    spaceBefore=4, spaceAfter=12,
)

# ── TOC Document Template ──
class TocDocTemplate(SimpleDocTemplate):
    def afterFlowable(self, flowable):
        if hasattr(flowable, 'bookmark_name'):
            level = getattr(flowable, 'bookmark_level', 0)
            text = getattr(flowable, 'bookmark_text', '')
            key = getattr(flowable, 'bookmark_key', '')
            self.notify('TOCEntry', (level, text, self.page, key))

# ── Helper functions ──
def add_heading(text, style, level=0):
    key = 'h_%s' % hashlib.md5(text.encode()).hexdigest()[:8]
    p = Paragraph('<a name="%s"/>%s' % (key, text), style)
    p.bookmark_name = text
    p.bookmark_level = level
    p.bookmark_text = text
    p.bookmark_key = key
    return p

H1_ORPHAN_THRESHOLD = (PAGE_H - TOP_MARGIN - BOTTOM_MARGIN) * 0.15

def add_major_section(text, style):
    return [
        CondPageBreak(H1_ORPHAN_THRESHOLD),
        add_heading(text, style, level=0),
    ]

def make_table(data, col_ratios, caption_text=None):
    """Create a styled table with proportional column widths."""
    col_widths = [r * CONTENT_W for r in col_ratios]
    t = Table(data, colWidths=col_widths, hAlign='CENTER')
    style_cmds = [
        ('BACKGROUND', (0, 0), (-1, 0), HEADER_FILL),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ]
    for i in range(1, len(data)):
        bg = colors.white if i % 2 == 1 else TABLE_STRIPE
        style_cmds.append(('BACKGROUND', (0, i), (-1, i), bg))
    t.setStyle(TableStyle(style_cmds))
    elements = [Spacer(1, 18), t]
    if caption_text:
        elements.append(Spacer(1, 6))
        elements.append(Paragraph(caption_text, style_caption))
    elements.append(Spacer(1, 18))
    return elements

def bullet(text):
    return Paragraph('<bullet>&bull;</bullet> ' + text, style_bullet)

def body(text):
    return Paragraph(text, style_body)

def callout(text):
    return Paragraph('<b>' + text + '</b>', style_callout)

def hr():
    return HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceBefore=6, spaceAfter=6)

# ══════════════════════════════════════════
#  BUILD DOCUMENT
# ══════════════════════════════════════════
OUTPUT_BODY = '/home/z/my-project/download/plan_body.pdf'
OUTPUT_FINAL = '/home/z/my-project/download/Plan_Expansion_NexoStudio.pdf'

doc = TocDocTemplate(
    OUTPUT_BODY, pagesize=A4,
    leftMargin=LEFT_MARGIN, rightMargin=RIGHT_MARGIN,
    topMargin=TOP_MARGIN, bottomMargin=BOTTOM_MARGIN,
)

story = []

# ── TABLE OF CONTENTS ──
toc = TableOfContents()
toc.levelStyles = [
    ParagraphStyle(name='TOC1', fontName=FONT_HEAD, fontSize=13, leading=22, leftIndent=20, spaceBefore=6),
    ParagraphStyle(name='TOC2', fontName=FONT_BODY, fontSize=11, leading=18, leftIndent=40, spaceBefore=2),
]
story.append(Paragraph('<b>Contenido</b>', style_h1))
story.append(Spacer(1, 12))
story.append(toc)
story.append(PageBreak())

# ══════════════════════════════════════════
#  1. RESUMEN EJECUTIVO
# ══════════════════════════════════════════
story.extend(add_major_section('1. Resumen Ejecutivo', style_h1))

story.append(body(
    'Nexo Studio es una firma de arquitectura y diseño con sede en Medellin, Colombia, '
    'fundada por Catalina Molina Alvarez y Juan Mateo Yepes Correa. La empresa se especializa '
    'en diseno arquitectonico, gerencia de proyectos, factibilidad inmobiliaria y diseno de '
    'interiores. Con un equipo consolidado, herramientas de vanguardia (Revit, SketchUp, '
    'Unreal Engine, D5 Render, entre otras) y un portafolio que demuestra versatilidad en '
    'proyectos residenciales y comerciales, Nexo Studio se encuentra en una posicion estrategica '
    'para escalar sus operaciones.'
))
story.append(body(
    'El presente plan de accion traza una hoja de ruta de 36 meses para expandir la empresa '
    'en tres dimensiones clave: ampliacion de la cartera de servicios, crecimiento geografico '
    'hacia el Valle de Aburra y principales ciudades colombianas, y fortalecimiento de la '
    'presencia digital y las alianzas estrategicas. Se proyecta que la ejecucion de este plan '
    'permita duplicar los ingresos anuales al tercer ano, ampliar el equipo a 8-10 profesionales '
    'y posicionar a Nexo Studio como referente en arquitectura biofilica y visualizacion inmersiva '
    'en la region.'
))

# ══════════════════════════════════════════
#  2. ANALISIS DE SITUACION ACTUAL (FODA)
# ══════════════════════════════════════════
story.extend(add_major_section('2. Analisis de la Situacion Actual', style_h1))

story.append(add_heading('2.1 Analisis FODA', style_h2, level=1))

foda_data = [
    [Paragraph('<b>Dimension</b>', style_table_header),
     Paragraph('<b>Descripcion</b>', style_table_header)],
    [Paragraph('<b>Fortalezas</b>', style_table_cell),
     Paragraph('Equipo multidisciplinario (arquitectura + diseno grafico + gestion). Dominio de herramientas BIM y renderizado en tiempo real. Portafolio diverso en residencial y comercial. Metodologia BIM implementada (Revit). Experiencia en gestion inmobiliaria.', style_table_cell)],
    [Paragraph('<b>Debilidades</b>', style_table_cell),
     Paragraph('Equipo reducido (2 personas) limita la capacidad de atender proyectos simultaneos. Presencia digital incipiente (sitio web recien creado). Dependencia de pocos canales de captacion de clientes. No se cuenta con certificaciones internacionales (LEED, BREEAM).', style_table_cell)],
    [Paragraph('<b>Oportunidades</b>', style_table_cell),
     Paragraph('Boom inmobiliario en Medellin y el Valle de Aburra. Creciente demanda de arquitectura biofilica y sostenible. Tendencia de visualizacion inmersiva (VR/AR) en el sector. Programas de construccion sostenible del gobierno colombiano. Mercados emergentes en ciudades como Cali, Barranquilla y Cartagena.', style_table_cell)],
    [Paragraph('<b>Amenazas</b>', style_table_cell),
     Paragraph('Competencia de firmas establecidas con mayor estructura operativa. Volatilidad del sector construccion por factores macroeconomicos. Inflacion en costos de materiales y mano de obra. Cambios regulatorios en normativas urbanas.', style_table_cell)],
]
story.extend(make_table(foda_data, [0.18, 0.82], 'Tabla 1. Analisis FODA de Nexo Studio'))

story.append(add_heading('2.2 Capacidades Actuales', style_h2, level=1))

story.append(body(
    'Actualmente Nexo Studio opera con un modelo de estudio boutique, donde los dos fundadores '
    'asumen la totalidad de las funciones: desde la captacion del cliente y la formulacion de '
    'propuestas comerciales, pasando por el diseno arquitectonico y la modelacion 3D, hasta la '
    'gerencia de obra y la entrega final. Este modelo permite un alto nivel de personalizacion y '
    'control de calidad, pero limita la capacidad de atender mas de 2-3 proyectos activos de '
    'forma simultanea.'
))
story.append(body(
    'La infraestructura tecnologica es solida: el dominio de Revit para documentacion BIM, '
    'complementado con Twinmotion y Unreal Engine para recorridos virtuales inmersivos, '
    'posiciona al estudio en un segmento diferenciado frente a competidores que aun dependen '
    'de renders estaticos. Esta ventaja competitiva debe explotarse como eje central de la '
    'estrategia de expansion.'
))

# ══════════════════════════════════════════
#  3. VISION Y OBJETIVOS
# ══════════════════════════════════════════
story.extend(add_major_section('3. Vision y Objetivos de Expansion', style_h1))

story.append(add_heading('3.1 Vision a 3 anos', style_h2, level=1))
story.append(callout(
    'Posicionar a Nexo Studio como la firma lider en arquitectura biofilica y visualizacion '
    'inmersiva en el Eje Cafetero y la region Andina colombiana, reconocida por la calidad '
    'de sus proyectos residenciales y comerciales, y por su capacidad de ofrecer experiencias '
    'virtuales que transforman la forma en que los clientes interactuan con los espacios '
    'antes de construirlos.'
))

story.append(add_heading('3.2 Objetivos Estrategicos', style_h2, level=1))

obj_data = [
    [Paragraph('<b>Objetivo</b>', style_table_header),
     Paragraph('<b>Meta</b>', style_table_header),
     Paragraph('<b>Plazo</b>', style_table_header)],
    [Paragraph('Incrementar ingresos anuales', style_table_cell),
     Paragraph('Crecimiento del 100% respecto al ano base', style_table_cell),
     Paragraph('Mes 36', style_table_cell_c)],
    [Paragraph('Ampliar equipo de trabajo', style_table_cell),
     Paragraph('De 2 a 8-10 profesionales', style_table_cell),
     Paragraph('Mes 24-36', style_table_cell_c)],
    [Paragraph('Diversificar cartera de servicios', style_table_cell),
     Paragraph('Incluir visualizacion VR/AR y consultoria sostenible', style_table_cell),
     Paragraph('Mes 12-18', style_table_cell_c)],
    [Paragraph('Expandir presencia geografica', style_table_cell),
     Paragraph('Operar en 3 ciudades adicionales', style_table_cell),
     Paragraph('Mes 24-36', style_table_cell_c)],
    [Paragraph('Obtener certificacion LEED o BREEAM', style_table_cell),
     Paragraph('Al menos 1 profesional certificado', style_table_cell),
     Paragraph('Mes 18-24', style_table_cell_c)],
    [Paragraph('Posicionar marca digitalmente', style_table_cell),
     Paragraph('5,000 seguidores organicos en Instagram', style_table_cell),
     Paragraph('Mes 18', style_table_cell_c)],
]
story.extend(make_table(obj_data, [0.35, 0.45, 0.20], 'Tabla 2. Objetivos estrategicos cuantificados'))

# ══════════════════════════════════════════
#  4. ESTRATEGIAS DE EXPANSION
# ══════════════════════════════════════════
story.extend(add_major_section('4. Estrategias de Expansion', style_h1))

story.append(add_heading('4.1 Expansion de Servicios', style_h2, level=1))

story.append(body(
    'La linea de servicios actual cubre el ciclo basico del proyecto arquitectonico: desde el '
    'diseno hasta la gerencia de obra. Sin embargo, existen oportunidades claras para anadir '
    'servicios complementarios que aumenten el valor por cliente y diferencien la propuesta '
    'de Nexo Studio en el mercado.'
))

story.append(add_heading('4.1.1 Visualizacion Inmersiva (VR/AR)', style_h3))
story.append(body(
    'Con el dominio existente de Unreal Engine y Twinmotion, la transicion hacia experiencias '
    'de realidad virtual y aumentada es natural y de bajo costo de implementacion. Este servicio '
    'permite a los clientes "caminar" por sus proyectos antes de construirlos, reduciendo '
    'cambios en obra (que representan hasta un 15% del presupuesto en proyectos sin '
    'visualizacion previa) y aumentando la tasa de cierre de propuestas. La inversion '
    'inicial se estima en un par de visores Meta Quest y licencias de Unreal Engine, '
    'aproximadamente 3-5 millones de COP. Se recomienda ofrecer recorridos virtuales como '
    'servicio premium incluido en proyectos superiores a 200 m<super>2</super> y como servicio '
    'independiente para otras firmas de arquitectura que no cuentan con esta capacidad.'
))

story.append(add_heading('4.1.2 Consultoria en Arquitectura Sostenible', style_h3))
story.append(body(
    'La tendencia global hacia la construccion sostenible es irrefrenable. En Colombia, el '
    'Consejo Colombiano de Construccion Sostenible (CCCS) promueve activamente la certificacion '
    'LEED y la norma NTC 6112. Capacitar a al menos un miembro del equipo como profesional '
    'LEED Green Associate o LEED AP abre una nueva linea de ingreso: la consultoria en '
    'sostenibilidad para proyectos propios y de terceros. El mercado de edificaciones '
    'sostenibles en Colombia crece al 12% anual, y la demanda de consultores certificados '
    'supera la oferta disponible, especialmente en ciudades intermedias como Medellin.'
))

story.append(add_heading('4.1.3 Remodelacion Llave en Mano', style_h3))
story.append(body(
    'Actualmente Nexo Studio ofrece diseno y gerencia, pero la ejecucion de obra queda en '
    'manos de contratistas externos. Un modelo "llave en mano" que integre diseno, gestion '
    'y ejecucion bajo un solo contrato simplifica la experiencia del cliente y aumenta el '
    'margen bruto por proyecto entre un 20-30%. Para implementarlo sin asumir riesgo '
    'operativo excesivo, se recomienda empezar con alianzas exclusivas con 2-3 constructores '
    'de confianza, donde Nexo Studio actua como contratista principal y el constructor como '
    'subcontratista. Esta estructura permite mantener control de calidad sin necesidad de '
    'nominar obreros ni asumir liabilities laborales directos.'
))

story.append(add_heading('4.2 Expansion Geografica', style_h2, level=1))

story.append(body(
    'Medellin concentra la operacion actual, pero el crecimiento del sector inmobiliario '
    'colombiano no se limita a esta ciudad. La estrategia de expansion geografica sigue un '
    'modelo escalonado que minimiza el riesgo y maximiza el aprendizaje en cada fase.'
))

geo_data = [
    [Paragraph('<b>Fase</b>', style_table_header),
     Paragraph('<b>Ciudad</b>', style_table_header),
     Paragraph('<b>Estrategia de Entrada</b>', style_table_header),
     Paragraph('<b>Plazo</b>', style_table_header)],
    [Paragraph('Fase 1', style_table_cell_c),
     Paragraph('Valle de Aburra (Envigado, Sabaneta, La Estrella)', style_table_cell),
     Paragraph('Extension natural de la red de contactos actual. Campana digital dirigida a estos municipios.', style_table_cell),
     Paragraph('Mes 1-12', style_table_cell_c)],
    [Paragraph('Fase 2', style_table_cell_c),
     Paragraph('Bogota', style_table_cell),
     Paragraph('Alianza con firma local para proyectos conjuntos. Apertura de oficina virtual. Presencia en eventos del sector.', style_table_cell),
     Paragraph('Mes 12-24', style_table_cell_c)],
    [Paragraph('Fase 3', style_table_cell_c),
     Paragraph('Cali y Cartagena', style_table_cell),
     Paragraph('Proyectos piloto remotos con visitas periodicas. Modelo hibrido: diseno en Medellin, supervision en destino.', style_table_cell),
     Paragraph('Mes 24-36', style_table_cell_c)],
]
story.extend(make_table(geo_data, [0.10, 0.25, 0.45, 0.20], 'Tabla 3. Expansion geografica escalonada'))

story.append(add_heading('4.3 Alianzas Estrategicas', style_h2, level=1))

story.append(body(
    'Las alianzas son un multiplicador de capacidad sin la necesidad de inversion fija en '
    'nominas. Nexo Studio debe buscar socios estrategicos en tres categorias clave que '
    'complementen sus fortalezas y mitiguen sus debilidades actuales.'
))

story.append(bullet('<b>Constructoras y contratistas:</b> Acuerdos marco con 2-3 constructoras de Medellin para proyectos llave en mano. Esto permite ofrecer el servicio integral sin incrementar la nomina. Se negocia un margen de intermediacion del 10-15% sobre el valor de la obra.'))
story.append(bullet('<b>Firmas de interiorismo y paisajismo:</b> Colaboraciones con disenadores de interiores y paisajistas para ofrecer paquetes completos. El cliente recibe una propuesta unificada y Nexo Studio amplía su alcance sin costos adicionales.'))
story.append(bullet('<b>Agentes inmobiliarios:</b> Alianzas con agencias inmobiliarias para que recomienden a Nexo Studio como proveedor de diseno y factibilidad a compradores de terrenos o propiedades para remodelar. Se puede ofrecer una comision de referido del 5-8%.'))
story.append(bullet('<b>Instituciones academicas:</b> Convenios con universidades locales (Universidad Nacional, Universidad de Antioquia, UPB) para practicas profesionales, lo que permite acceder a talento joven a bajo costo y formar futuros colaboradores.'))
story.append(bullet('<b>Proveedores de tecnologia:</b> Acuerdos con distribuidores de Unreal Engine, D5 Render y hardware VR para obtener licencias preferenciales y acceso anticipado a nuevas funcionalidades.'))

# ══════════════════════════════════════════
#  5. PLAN DE MARKETING Y POSICIONAMIENTO
# ══════════════════════════════════════════
story.extend(add_major_section('5. Plan de Marketing y Posicionamiento', style_h1))

story.append(add_heading('5.1 Presencia Digital', style_h2, level=1))

story.append(body(
    'En el sector de arquitectura y diseno, la presencia visual es el argumento de venta '
    'mas poderoso. Un estudio que no se muestra, no existe para el cliente potencial. La '
    'estrategia digital de Nexo Studio debe centrarse en tres pilares: el sitio web como '
    'carta de presentacion, Instagram como vitrina visual, y LinkedIn como canal de '
    'networking profesional B2B.'
))

story.append(add_heading('5.1.1 Sitio Web', style_h3))
story.append(bullet('Mantener el sitio web actualizado con nuevos proyectos cada vez que se complete uno. El portafolio es la seccion mas visitada y la que genera mayor conversion.'))
story.append(bullet('Implementar un blog de arquitectura con articulos de valor (tendencias en diseno biofilico, beneficios de la visualizacion VR, guias de remodelacion). Esto mejora el SEO y posiciona a Nexo Studio como autoridad tematica.'))
story.append(bullet('Agregar testimonios de clientes satisfechos con foto y nombre. La prueba social incrementa la tasa de conversion en sitios web de servicios hasta un 270% segun estudios de Nielsen.'))
story.append(bullet('Optimizar la velocidad de carga y el desempeno movil. Mas del 60% del trafico web en Colombia proviene de dispositivos moviles.'))

story.append(add_heading('5.1.2 Instagram', style_h3))
story.append(body(
    'Instagram es la red social natural para la arquitectura. La estrategia debe incluir '
    'publicacion regular (3-4 veces por semana) con contenido variado: renders y planos de '
    'proyectos en proceso, antes y despues de remodelaciones, timelapses de modelado 3D, '
    'recorridos virtuales en formato Reel, y contenido educativo sobre diseno y sostenibilidad. '
    'Se recomienda invertir entre 200,000 y 500,000 COP mensuales en publicidad dirigida '
    'a personas interesadas en arquitectura, remodelacion y diseno de interiores en el '
    'Valle de Aburra, con edades entre 28 y 55 anos.'
))

story.append(add_heading('5.1.3 LinkedIn', style_h3))
story.append(body(
    'Para la captacion de proyectos comerciales y corporativos, LinkedIn es indispensable. '
    'Publicar articulos tecnicos sobre metodologia BIM, gerencia de proyectos y tendencias '
    'del sector construccion posiciona a los fundadores como expertos. Conectar activamente '
    'con gerentes de proyecto, directores de constructoras y desarrolladores inmobiliarios '
    'en Medellin y Bogota. La meta es establecer al menos 50 conexiones relevantes por mes '
    'y obtener 2-3 reuniones de prospeccion trimestrales a traves de esta plataforma.'
))

story.append(add_heading('5.2 Networking y Relaciones', style_h2, level=1))

story.append(body(
    'La arquitectura es un negocio de relaciones. Las recomendaciones personales y la '
    'confianza construida cara a cara siguen siendo el canal de captacion mas efectivo '
    'en el sector. Se recomienda la siguiente estrategia de networking presencial y digital.'
))

story.append(bullet('Asistir a al menos 2 eventos del sector por trimestre: ferias inmobiliarias (Expoinmobiliaria, Colombia Real Estate), congresos de arquitectura (SCA, Sociedad Colombiana de Arquitectos), y encuentros de construccion sostenible.'))
story.append(bullet('Afiliarse a la Sociedad Colombiana de Arquitectos y a la Camara Colombiana de la Construccion (Camacol). La membresia otorga credibilidad, acceso a directorios de proyectos y oportunidades de networking institucional.'))
story.append(bullet('Organizar talleres gratuitos mensuales sobre temas como "Como visualizar tu proyecto antes de construirlo" o "Diseno biofilico: como integrar naturaleza en tu hogar". Esto genera prospectos calificados y posiciona a Nexo Studio como referente educativo.'))
story.append(bullet('Implementar un programa de referidos que incentive a clientes satisfechos a recomendar nuevos proyectos, ofreciendo un descuento del 5% en su proximo proyecto por cada referido que contrate.'))

story.append(add_heading('5.3 Marca Personal de los Fundadores', style_h2, level=1))

story.append(body(
    'Catalina Molina, con su especializacion en gestion inmobiliaria y metodologia BIM, debe '
    'posicionarse como referente en gerencia de proyectos arquitectonicos y construccion '
    'sostenible. Juan Mateo Yepes, con su expertise en visualizacion y diseno grafico, debe '
    'ser la cara visible de la innovacion tecnologica del estudio. La marca personal de ambos '
    'refuerza la marca corporativa y genera confianza diferenciada: los clientes contratan '
    'a personas, no solo a empresas. Se recomienda que ambos mantengan perfiles activos en '
    'Instagram y LinkedIn, compartiendo contenido desde sus perspectivas individuales pero '
    'alineados con la narrativa de Nexo Studio.'
))

# ══════════════════════════════════════════
#  6. PLAN OPERATIVO Y DE TALENTO
# ══════════════════════════════════════════
story.extend(add_major_section('6. Plan Operativo y de Talento', style_h1))

story.append(add_heading('6.1 Estructura Organizacional Proyectada', style_h2, level=1))

story.append(body(
    'La transicion de un estudio de dos personas a una firma con 8-10 profesionales debe '
    'hacerse de forma gradual, alineando cada contratacion con el crecimiento real de la '
    'demanda. Contratar anticipadamente sin ingresos suficientes es uno de los errores mas '
    'comunes en estudios de arquitectura en expansion. El siguiente cuadro muestra la hoja '
    'de ruta de contratacion recomendada.'
))

talent_data = [
    [Paragraph('<b>Periodo</b>', style_table_header),
     Paragraph('<b>Perfil</b>', style_table_header),
     Paragraph('<b>Funcion Principal</b>', style_table_header),
     Paragraph('<b>Modalidad</b>', style_table_header)],
    [Paragraph('Mes 1-6', style_table_cell_c),
     Paragraph('Practicante de arquitectura', style_table_cell),
     Paragraph('Apoyo en modelado 3D, planos y renders', style_table_cell),
     Paragraph('Practica universitaria', style_table_cell_c)],
    [Paragraph('Mes 6-12', style_table_cell_c),
     Paragraph('Arquitecto junior', style_table_cell),
     Paragraph('Desarrollo de proyectos bajo supervision, documentacion BIM', style_table_cell),
     Paragraph('Tiempo completo', style_table_cell_c)],
    [Paragraph('Mes 12-18', style_table_cell_c),
     Paragraph('Disenador 3D / Visualizador', style_table_cell),
     Paragraph('Especialista en renders, VR/AR y postproduccion', style_table_cell),
     Paragraph('Tiempo completo', style_table_cell_c)],
    [Paragraph('Mes 12-18', style_table_cell_c),
     Paragraph('Asistente administrativo', style_table_cell),
     Paragraph('Gestion documental, facturacion, atencion al cliente', style_table_cell),
     Paragraph('Tiempo completo', style_table_cell_c)],
    [Paragraph('Mes 18-24', style_table_cell_c),
     Paragraph('Arquitecto senior / Gerente de proyectos', style_table_cell),
     Paragraph('Liderazgo de proyectos complejos, supervision de equipo', style_table_cell),
     Paragraph('Tiempo completo', style_table_cell_c)],
    [Paragraph('Mes 24-36', style_table_cell_c),
     Paragraph('Interiorista', style_table_cell),
     Paragraph('Diseno de interiores como servicio independiente', style_table_cell),
     Paragraph('Tiempo completo o freelance', style_table_cell_c)],
    [Paragraph('Mes 24-36', style_table_cell_c),
     Paragraph('Coordinador comercial', style_table_cell),
     Paragraph('Captacion de clientes, propuestas comerciales, alianzas', style_table_cell),
     Paragraph('Tiempo completo', style_table_cell_c)],
]
story.extend(make_table(talent_data, [0.12, 0.24, 0.40, 0.24], 'Tabla 4. Plan de contratacion progresiva'))

story.append(add_heading('6.2 Formacion Continua', style_h2, level=1))

story.append(body(
    'La formacion continua es una inversion, no un gasto. En un sector donde las herramientas '
    'y las normativas evolucionan constantemente, el equipo que deja de aprender se queda '
    'atras. Nexo Studio debe asignar un presupuesto anual de capacitacion equivalente al '
    '3-5% de la nomina, destinado a las siguientes prioridades.'
))

story.append(bullet('<b>Certificacion LEED Green Associate / LEED AP:</b> Inversion aproximada de 1,500-2,500 USD por persona (curso + examen). Retorno: apertura de la linea de consultoria en sostenibilidad y diferenciacion competitiva.'))
story.append(bullet('<b>Actualizacion en Unreal Engine y real-time rendering:</b> Cursos online en Epic Games Learning o plataformas especializadas. Inversion de 200-500 USD anuales por persona. Retorno: mantenimiento de la ventaja tecnologica.'))
story.append(bullet('<b>Gestion empresarial y liderazgo:</b> Programa de formacion en gestion de empresas de servicios profesionales para los fundadores. Retorno: mejor toma de decisiones, delegacion efectiva y escalabilidad del negocio.'))
story.append(bullet('<b>Normativas urbanas y construccion sostenible colombiana:</b> Actualizacion permanente sobre cambios en regulaciones POT, NTC 6112 y normativas municipales. Retorno: cumplimiento regulatorio y valor agregado en consultoria.'))

# ══════════════════════════════════════════
#  7. PLAN FINANCIERO
# ══════════════════════════════════════════
story.extend(add_major_section('7. Plan Financiero', style_h1))

story.append(add_heading('7.1 Inversion Inicial Requerida', style_h2, level=1))

story.append(body(
    'La expansion requiere una inversion inicial prudente. A diferencia de otros sectores, '
    'en arquitectura el activo principal es el talento y la tecnologia, no la infraestructura '
    'fisica. La siguiente tabla detalla las inversiones necesarias para los primeros 12 meses '
    'de ejecucion del plan.'
))

inv_data = [
    [Paragraph('<b>Concepto</b>', style_table_header),
     Paragraph('<b>Inversion Estimada (COP)</b>', style_table_header),
     Paragraph('<b>Prioridad</b>', style_table_header)],
    [Paragraph('Equipo VR (2 visores Meta Quest 3)', style_table_cell),
     Paragraph('$3,500,000 - $5,000,000', style_table_cell_c),
     Paragraph('Alta', style_table_cell_c)],
    [Paragraph('Mejora de equipo de computo (GPU para rendering)', style_table_cell),
     Paragraph('$8,000,000 - $12,000,000', style_table_cell_c),
     Paragraph('Alta', style_table_cell_c)],
    [Paragraph('Presupuesto digital (Instagram + Google Ads, 12 meses)', style_table_cell),
     Paragraph('$3,600,000 - $6,000,000', style_table_cell_c),
     Paragraph('Alta', style_table_cell_c)],
    [Paragraph('Certificacion LEED (1 profesional)', style_table_cell),
     Paragraph('$6,000,000 - $10,000,000', style_table_cell_c),
     Paragraph('Media', style_table_cell_c)],
    [Paragraph('Membresias (SCA, Camacol, CCCS)', style_table_cell),
     Paragraph('$1,500,000 - $3,000,000', style_table_cell_c),
     Paragraph('Media', style_table_cell_c)],
    [Paragraph('Eventos y networking (4 eventos/ano)', style_table_cell),
     Paragraph('$2,000,000 - $4,000,000', style_table_cell_c),
     Paragraph('Media', style_table_cell_c)],
    [Paragraph('Contenido profesional (fotografia, video)', style_table_cell),
     Paragraph('$2,000,000 - $4,000,000', style_table_cell_c),
     Paragraph('Alta', style_table_cell_c)],
    [Paragraph('<b>TOTAL ESTIMADO</b>', style_table_cell),
     Paragraph('<b>$26,600,000 - $44,000,000</b>', style_table_cell_c),
     Paragraph('', style_table_cell_c)],
]
story.extend(make_table(inv_data, [0.50, 0.30, 0.20], 'Tabla 5. Inversion inicial estimada (primeros 12 meses)'))

story.append(add_heading('7.2 Proyeccion de Ingresos', style_h2, level=1))

story.append(body(
    'La proyeccion de ingresos se construye sobre supuestos conservadores: crecimiento '
    'organico del 30% en el primer ano impulsado por la mejora en marketing digital, 50% '
    'en el segundo ano por la adicion de nuevos servicios y expansion geografica, y 20% '
    'en el tercer ano por consolidacion. Los nuevos servicios (VR/AR y consultoria '
    'sostenible) representan inicialmente un 10-15% de los ingresos y se proyecta que '
    'alcancen un 25-30% al tercer ano.'
))

proj_data = [
    [Paragraph('<b>Concepto</b>', style_table_header),
     Paragraph('<b>Ano 1</b>', style_table_header),
     Paragraph('<b>Ano 2</b>', style_table_header),
     Paragraph('<b>Ano 3</b>', style_table_header)],
    [Paragraph('Ingresos por diseno arquitectonico', style_table_cell),
     Paragraph('+30%', style_table_cell_c),
     Paragraph('+50%', style_table_cell_c),
     Paragraph('+20%', style_table_cell_c)],
    [Paragraph('Ingresos por gerencia de proyectos', style_table_cell),
     Paragraph('+25%', style_table_cell_c),
     Paragraph('+40%', style_table_cell_c),
     Paragraph('+25%', style_table_cell_c)],
    [Paragraph('Ingresos por visualizacion VR/AR (nuevo)', style_table_cell),
     Paragraph('10% del total', style_table_cell_c),
     Paragraph('18% del total', style_table_cell_c),
     Paragraph('25% del total', style_table_cell_c)],
    [Paragraph('Ingresos por consultoria sostenible (nuevo)', style_table_cell),
     Paragraph('0%', style_table_cell_c),
     Paragraph('8% del total', style_table_cell_c),
     Paragraph('15% del total', style_table_cell_c)],
    [Paragraph('Crecimiento total estimado vs. ano base', style_table_cell),
     Paragraph('+30%', style_table_cell_c),
     Paragraph('+80%', style_table_cell_c),
     Paragraph('+100%', style_table_cell_c)],
]
story.extend(make_table(proj_data, [0.40, 0.20, 0.20, 0.20], 'Tabla 6. Proyeccion de crecimiento de ingresos por servicio'))

story.append(add_heading('7.3 Punto de Equilibrio y Rentabilidad', style_h2, level=1))

story.append(body(
    'Con la inversion inicial estimada de 26-44 millones de COP y un margen bruto promedio '
    'del 40-50% en servicios de arquitectura, el punto de equilibrio de la inversion se '
    'proyecta entre los meses 14 y 20, dependiendo del ritmo de captacion de nuevos '
    'proyectos. Es fundamental durante los primeros 12 meses mantener un control estricto '
    'de costos operativos y priorizar las inversiones con retorno mas rapido: marketing '
    'digital y contenido visual. Las inversiones en certificacion y equipos VR, si bien '
    'son estrategicamente importantes, tienen un periodo de retorno mas largo (12-18 meses) '
    'y deben escalonarse para no comprometer el flujo de caja.'
))

# ══════════════════════════════════════════
#  8. CRONOGRAMA DE IMPLEMENTACION
# ══════════════════════════════════════════
story.extend(add_major_section('8. Cronograma de Implementacion', style_h1))

story.append(body(
    'El siguiente cronograma organiza las acciones prioritarias en cuatro trimestres, '
    'estableciendo responsables y entregables concretos. Cada trimestre tiene un objetivo '
    'claro que construye sobre los resultados del periodo anterior, permitiendo ajustes '
    'basados en la realidad del mercado y la capacidad operativa del equipo.'
))

crono_data = [
    [Paragraph('<b>Trimestre</b>', style_table_header),
     Paragraph('<b>Acciones Clave</b>', style_table_header),
     Paragraph('<b>Responsable</b>', style_table_header),
     Paragraph('<b>Entregable</b>', style_table_header)],
    [Paragraph('T1 (Mes 1-3)', style_table_cell_c),
     Paragraph('Lanzar campana digital. Contratar practicante. Crear contenido profesional (fotos y video de proyectos). Inscribirse en SCA y Camacol.', style_table_cell),
     Paragraph('Ambos fundadores', style_table_cell),
     Paragraph('Cuentas activas, primer practicante, material fotografico', style_table_cell)],
    [Paragraph('T2 (Mes 4-6)', style_table_cell_c),
     Paragraph('Lanzar servicio de visualizacion VR. Primera campana de Instagram Ads. Organizar primer taller gratuito. Iniciar formacion LEED.', style_table_cell),
     Paragraph('Mateo (VR), Catalina (LEED)', style_table_cell),
     Paragraph('Primer cliente VR, 500 seguidores IG, taller realizado', style_table_cell)],
    [Paragraph('T3 (Mes 7-9)', style_table_cell_c),
     Paragraph('Contratar arquitecto junior. Explorar alianza con constructora. Asistir a 2 eventos del sector. Lanzar blog en sitio web.', style_table_cell),
     Paragraph('Catalina (alianzas), Mateo (blog)', style_table_cell),
     Paragraph('Arquitecto junior, alianza framework, 2 eventos, blog activo', style_table_cell)],
    [Paragraph('T4 (Mes 10-12)', style_table_cell_c),
     Paragraph('Evaluar resultados y ajustar. Formalizar alianza con constructora. Iniciar prospeccion en Bogota. Presentar certificacion LEED.', style_table_cell),
     Paragraph('Ambos fundadores', style_table_cell),
     Paragraph('Reporte anual, alianza firmada, prospeccion Bogota, examen LEED', style_table_cell)],
]
story.extend(make_table(crono_data, [0.12, 0.40, 0.20, 0.28], 'Tabla 7. Cronograma de implementacion (primer ano)'))

story.append(body(
    'Para el segundo y tercer ano, el cronograma se ajustara en funcion de los resultados '
    'del primer ano. Las prioridades seran la consolidacion de la alianza con constructoras, '
    'la apertura de operaciones en Bogota (ano 2) y la expansion a Cali y Cartagena (ano 3), '
    'junto con el crecimiento del equipo segun la demanda real. Cada trimestre se realizara '
    'una revision de indicadores para redireccionar esfuerzos segun sea necesario.'
))

# ══════════════════════════════════════════
#  9. INDICADORES DE SEGUIMIENTO
# ══════════════════════════════════════════
story.extend(add_major_section('9. Indicadores de Seguimiento (KPIs)', style_h1))

story.append(body(
    'Lo que no se mide, no se puede mejorar. Los siguientes indicadores deben monitorearse '
    'de forma mensual o trimestral para evaluar el avance del plan y tomar decisiones '
    'correctivas oportunas. Se establecen metas progresivas para cada indicador, permitiendo '
    'identificar desviaciones antes de que se conviertan en problemas estructurales.'
))

kpi_data = [
    [Paragraph('<b>Indicador</b>', style_table_header),
     Paragraph('<b>Meta Ano 1</b>', style_table_header),
     Paragraph('<b>Meta Ano 2</b>', style_table_header),
     Paragraph('<b>Meta Ano 3</b>', style_table_header),
     Paragraph('<b>Frecuencia</b>', style_table_header)],
    [Paragraph('Proyectos activos simultaneos', style_table_cell),
     Paragraph('3-4', style_table_cell_c),
     Paragraph('5-7', style_table_cell_c),
     Paragraph('8-10', style_table_cell_c),
     Paragraph('Mensual', style_table_cell_c)],
    [Paragraph('Ingresos vs. ano base', style_table_cell),
     Paragraph('+30%', style_table_cell_c),
     Paragraph('+80%', style_table_cell_c),
     Paragraph('+100%', style_table_cell_c),
     Paragraph('Trimestral', style_table_cell_c)],
    [Paragraph('Seguidores Instagram', style_table_cell),
     Paragraph('1,500', style_table_cell_c),
     Paragraph('3,500', style_table_cell_c),
     Paragraph('5,000+', style_table_cell_c),
     Paragraph('Mensual', style_table_cell_c)],
    [Paragraph('Tasa de conversion de propuestas', style_table_cell),
     Paragraph('30%', style_table_cell_c),
     Paragraph('40%', style_table_cell_c),
     Paragraph('50%', style_table_cell_c),
     Paragraph('Trimestral', style_table_cell_c)],
    [Paragraph('Clientes por referido', style_table_cell),
     Paragraph('15%', style_table_cell_c),
     Paragraph('25%', style_table_cell_c),
     Paragraph('35%', style_table_cell_c),
     Paragraph('Trimestral', style_table_cell_c)],
    [Paragraph('Proyectos VR/AR facturados', style_table_cell),
     Paragraph('3-5', style_table_cell_c),
     Paragraph('8-12', style_table_cell_c),
     Paragraph('15-20', style_table_cell_c),
     Paragraph('Trimestral', style_table_cell_c)],
    [Paragraph('NPS (Net Promoter Score)', style_table_cell),
     Paragraph('>40', style_table_cell_c),
     Paragraph('>50', style_table_cell_c),
     Paragraph('>60', style_table_cell_c),
     Paragraph('Semestral', style_table_cell_c)],
]
story.extend(make_table(kpi_data, [0.28, 0.16, 0.16, 0.16, 0.14], 'Tabla 8. Indicadores clave de desempeno'))

# ══════════════════════════════════════════
#  10. RIESGOS Y MITIGACION
# ══════════════════════════════════════════
story.extend(add_major_section('10. Riesgos y Mitigacion', style_h1))

story.append(body(
    'Todo plan de expansion conlleva riesgos. La clave no es eliminarlos, sino '
    'identificarlos anticipadamente y definir estrategias de mitigacion que reduzcan su '
    'impacto potencial. A continuacion se presentan los principales riesgos identificados '
    'para Nexo Studio, junto con su probabilidad de ocurrencia, impacto potencial y las '
    'acciones de mitigacion recomendadas.'
))

risk_data = [
    [Paragraph('<b>Riesgo</b>', style_table_header),
     Paragraph('<b>Probabilidad</b>', style_table_header),
     Paragraph('<b>Impacto</b>', style_table_header),
     Paragraph('<b>Mitigacion</b>', style_table_header)],
    [Paragraph('Crecimiento mas lento de lo esperado', style_table_cell),
     Paragraph('Media', style_table_cell_c),
     Paragraph('Alto', style_table_cell_c),
     Paragraph('Mantener estructura de costos flexible. Contratar solo cuando haya demanda real. Posponer inversiones no criticas.', style_table_cell)],
    [Paragraph('Perdida de un fundador clave', style_table_cell),
     Paragraph('Baja', style_table_cell_c),
     Paragraph('Muy alto', style_table_cell_c),
     Paragraph('Documentar procesos. Distribuir conocimiento entre equipo. Seguro de vida/habilidad para socios.', style_table_cell)],
    [Paragraph('Entrada de competidor con propuesta similar', style_table_cell),
     Paragraph('Alta', style_table_cell_c),
     Paragraph('Medio', style_table_cell_c),
     Paragraph('Diferenciarse en servicio al cliente y calidad visual. Moverse rapido en VR/AR y sostenibilidad. Construir marca antes que la competencia.', style_table_cell)],
    [Paragraph('Problemas de flujo de caja', style_table_cell),
     Paragraph('Media', style_table_cell_c),
     Paragraph('Alto', style_table_cell_c),
     Paragraph('Cobrar anticipos del 40-50%. Mantener reserva de 3 meses de gastos operativos. Diversificar fuentes de ingreso.', style_table_cell)],
    [Paragraph('Dificultad para contratar talento calificado', style_table_cell),
     Paragraph('Media', style_table_cell_c),
     Paragraph('Medio', style_table_cell_c),
     Paragraph('Mantener programa activo de practicas. Ofrecer flexibilidad y proyectos estimulantes. Capacitar internamente cuando sea posible.', style_table_cell)],
    [Paragraph('Cambios regulatorios desfavorables', style_table_cell),
     Paragraph('Baja', style_table_cell_c),
     Paragraph('Medio', style_table_cell_c),
     Paragraph('Mantenerse actualizado a traves de gremios. Diversificar tipo de proyectos para no depender de un solo segmento normativo.', style_table_cell)],
]
story.extend(make_table(risk_data, [0.22, 0.12, 0.12, 0.54], 'Tabla 9. Matriz de riesgos y estrategias de mitigacion'))

story.append(Spacer(1, 18))
story.append(body(
    'La ejecucion exitosa de este plan requiere disciplina, adaptabilidad y compromiso '
    'con la vision a largo plazo. Los fundamentos estan solidos: un equipo complementario, '
    'herramientas competitivas, un portafolio demostrado y un mercado en crecimiento. '
    'La expansion no es una cuestion de si, sino de como y cuando. Este plan de accion '
    'proporciona la hoja de ruta; la ejecucion diaria determinara el resultado.'
))

# ══════════════════════════════════════════
#  BUILD
# ══════════════════════════════════════════
doc.multiBuild(story)
print(f'Body PDF generated: {OUTPUT_BODY}')
