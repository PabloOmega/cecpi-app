
import {
    Flex,
    Card,
    Heading,
    Text,
    Image,
    Divider,
    Button,
    TextField,
    useTheme
} from '@aws-amplify/ui-react';
import { ParallaxProvider, ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
import ImageButtonTextSection from "./components/ImageButtonTextSection"
import GridIconTextSection from "./components/GridIconTextSection"
import BannerSection from "./components/BannerSection"
import ParallaxSection from "./components/ParallaxSection"
import portada from '../assets/portada.jpg'
import reactLogo from '../assets/react.svg'

const firstGrid = [
    {
        icon: reactLogo,
        title: "Plataforma propia",
        text: "Los cursos los recibes mediante nuestra propia plataforma adecuada y potenciada con inteligencia artificial " +
            "para mejorar tu experiencia de aprendizaje a lo largo del curso. Recibe acompañamiento por parte del instructor, " +
            "resuelve test y actividades, utiliza nuestro ChatGPT, entre otros beneficios."
    },
    {
        icon: reactLogo,
        title: "Recursos de aprendizaje",
        text: "En CECPI, contamos con una amplia variedad de recursos de aprendizaje para complementar tus clases. Tendrás " +
            "acceso a tutoriales en video, ejercicios prácticos y material de lectura que te ayudarán a reforzar tus conocimientos " +
            "y mejorar tus habilidades de programación e IA."
    },
    {
        icon: reactLogo,
        title: "Instructores expertos",
        text: "Nuestros instructores son profesionales con amplia experiencia en desarrollo de software y programación. Te guiarán " +
            "a lo largo de tu aprendizaje y te brindarán los conocimientos necesarios para que puedas destacarte en la industria."
    },
    {
        icon: reactLogo,
        title: "Comunidad de estudiantes",
        text: "Al unirte a CECPI, te convertirás en parte de una comunidad de estudiantes apasionados por la programación e " +
            "Inteligencia Artificial. Podrás colaborar con otros estudiantes, compartir ideas y proyectos, y recibir " +
            "retroalimentación constructiva para mejorar tus habilidades."
    },
]

const secondGrid = [
    {
        icon: reactLogo,
        title: "Experiencia en TI",
        text: "Somos consultores TI especializados en Inteligencia Artificial y desarrollo web. Nuestro objetivo es ayudarte a " +
            "alcanzar el éxito en tu negocio. Destacamos por nuestros amplios conocimientos en el campo de la tecnología de la " +
            "información. Nos enfocamos en ofrecerte soluciones personalizadas y de calidad para satisfacer tus necesidades."
    },
    {
        icon: reactLogo,
        title: "Enfoque estratégico",
        text: "En CECPI, nos destacamos por nuestro enfoque estratégico en cada proyecto. Analizamos detalladamente tus " +
            "necesidades y objetivos para diseñar soluciones eficientes y efectivas. Nuestro equipo de consultores en TI cuenta " +
            "con amplios conocimientos y experiencia en el campo, lo que nos permite ofrecerte resultados de calidad y superar " +
            "tus expectativas."
    },
    {
        icon: reactLogo,
        title: "Atención personalizada",
        text: "En CECPI, nos preocupamos por brindarte una atención personalizada. Entendemos que cada negocio es único y tiene " +
            "necesidades específicas. Por eso, nos aseguramos de escuchar tus requerimientos y adaptar nuestras soluciones a tus " +
            "objetivos. Nuestro equipo de consultores en TI estará siempre disponible para brindarte el apoyo que necesitas."
    },
    {
        icon: reactLogo,
        title: "Garantía de satisfacción",
        text: "En CECPI, nos comprometemos a brindarte un servicio de calidad. Estamos seguros de la excelencia de nuestro " +
            "trabajo y por eso ofrecemos una garantía de satisfacción. Si no quedas satisfecho con nuestros servicios, te " +
            "devolvemos tu dinero. Tu satisfacción es nuestra prioridad."
    },
]

const Home = () => {
    const { tokens } = useTheme();
    return (
        <Flex className="flex-principal">
            <Card as="section">
                <Flex className="flex-seccion">
                    <Card width="45%" padding="medium">
                        <Heading level="4">
                            ¡Bienvenido a CECPI!
                        </Heading>
                        <Text as="p" fontSize="1em" fontWeight="normal" textAlign="center" margin="medium">
                            Somos tu socio confiable en el mundo de la inteligencia
                            artificial y el desarrollo web. Desde asesoría personalizada
                            hasta soluciones innovadoras, estamos aquí para impulsar tu
                            negocio hacia el éxito. Descubre nuestro compromiso con la
                            excelencia a través de capacitaciones y cursos especializados
                            en programación e inteligencia artificial. ¡Prepárate para
                            transformar tus ideas en realidad con nosotros!
                        </Text>
                    </Card>
                    <Card width="45%">
                        <Image alt="Programadores" src={portada} />
                    </Card>
                </Flex>
            </Card>
            <ImageButtonTextSection
                title="Python e Inteligencia Artificial"
                text="¡Domina Python y lidera el futuro de la Inteligencia Artificial con CECPI! Descubre el lenguaje de
                    programación más poderoso mientras te sumerges en el emocionante mundo de la IA. Nuestros cursos, 
                    respaldados por expertos, te prepararán para desarrollar algoritmos, machine learning y proyectos 
                    innovadores. Únete a nosotros y desbloquea un camino hacia el éxito en Python e IA."
                img={portada}
                imgAlt="Programadores"
                firstText={false}
            />
            <ImageButtonTextSection
                title="Desarrollo de videojuegos"
                text="Descubre nuestros cursos de desarrollo de videojuegos 2D en Unity. Aprende a crear tus propios juegos
                    y sumérgete en el mundo de la programación. Nuestros cursos te brindarán las habilidades necesarias
                    para convertirte en un desarrollador de videojuegos profesional."
                img={portada}
                imgAlt="Programadores"
            />
            <GridIconTextSection components={firstGrid} />
            <BannerSection
                heading="¡No pierdas más tiempo! Inscríbete en nuestros cursos y comienza tu camino hacia una carrera emocionante
                    en programación y desarrollo de software."
                buttons={[
                    {
                        href: "/cursos/ia",
                        text: "Ir a cursos de IA"
                    },
                    {
                        href: "/cursos/unity",
                        text: "Ir a cursos de Unity"
                    }
                ]}
            />
            <ParallaxSection
                backgroundImg={portada}
                title="Asesoría IA y Web"
                text="Brindamos asesoría en Inteligencia Artificial y desarrollo web. Estamos aquí para ayudarte
                    a tomar decisiones estratégicas y potenciar tu negocio. Con nuestra experiencia y
                    conocimiento de la industria, te ofrecemos soluciones viables y resultados reales.
                    Contáctanos para programar una reunión."
                button={{
                    href: null,
                    text: "Contacto"
                }}
            />
            <GridIconTextSection components={secondGrid} />
            <BannerSection
                heading="Si estás buscando asesoría en Inteligencia Artificial y/o Desarrollo web, no dudes en contactarnos.
                        En CECPI, estamos listos para ayudarte a alcanzar tus metas y potenciar tu negocio. ¡Ponte en contacto
                        con nosotros hoy mismo!"
                buttons={[
                    {
                        href: null,
                        text: "Contáctanos"
                    },
                ]}
            />
            <Card as="section">
                <Flex
                    direction="row"
                    gap="2rem"
                    justifyContent="center"
                    alignContent="stretch"
                    alignItems="stretch"
                >
                    <Heading level={2} marginBlock="auto">Partners</Heading>
                    <Divider orientation="vertical" />
                    <Card>
                        <Flex
                            direction="row"
                            gap="1rem"
                        >
                            <Image src={reactLogo} width="100px" />
                            <Image src={reactLogo} width="100px" />
                            <Image src={reactLogo} width="100px" />
                        </Flex>
                    </Card>
                </Flex>
            </Card>
            <Card as="section">
                <Flex
                    as="form"
                    direction="column"
                    gap="1rem"
                    justifyContent="center"
                    alignItems="center"
                    alignContent="center"
                    width="40%"
                    marginInline="auto"
                >
                    <TextField
                        label={
                            <Heading level={3} marginBottom="large">
                                Suscríbete para estar al tanto de nuestras últimas novedades
                            </Heading>
                        }
                        errorMessage="Ingresa un correo válido"
                        isRequired={true}
                        type="email"
                        placeholder="ej:email@dominio.com"
                        outerEndComponent={<Button type="submit">Suscribirme</Button>}
                        placeContent="center"
                    />
                </Flex>
            </Card>
        </Flex>
    );
};

export default Home;