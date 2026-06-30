
const currentUrl = window.location.href;
const siteUrl = "https://pablozd.ar"; 
let updatedUrl = currentUrl.replace("https://pablozd.ar", "");
if (currentUrl.length == updatedUrl.length && currentUrl.startsWith("http://127.0.0.1")) {
  const otherSiteUrl = siteUrl.replace("localhost", "127.0.0.1");
  updatedUrl = currentUrl.replace(otherSiteUrl + "", "");
}
if ("".length > 0) {
  updatedUrl = updatedUrl.replace("/", "");
}
// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-inicio",
    title: "inicio",
    section: "Menú de navegación",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-investigación",
          title: "investigación",
          description: "Proyectos, publicaciones, presentaciones y drafts.",
          section: "Menú de navegación",
          handler: () => {
            window.location.href = "/investigacion/";
          },
        },{id: "nav-docencia",
          title: "docencia",
          description: "",
          section: "Menú de navegación",
          handler: () => {
            window.location.href = "/docencia/";
          },
        },{id: "nav-herramientas",
          title: "herramientas",
          description: "Aplicaciones web y paquetes LaTeX desarrollados para investigación y docencia.",
          section: "Menú de navegación",
          handler: () => {
            window.location.href = "/herramientas/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Menú de navegación",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "",handler: () => {
              window.location.href = "/books/en-us/the_godfather/";
            },},{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "",handler: () => {
              window.location.href = "/books/pt-br/the_godfather/";
            },},{id: "news-nueva-edición-del-cuex-integración-crítica-y-práctica-de-la-inteligencia-artificial-generativa-en-la-enseñanza-de-humanidades-y-ciencias-sociales-junto-con-fernando-carranza-ángel-maldonado-y-mariano-vilar-ffyl-uba-comienza-el-18-de-julio-modalidad-virtual",
          title: 'Nueva edición del CUEX “Integración crítica y práctica de la Inteligencia Artificial Generativa...',
          description: "",
          section: "Noticias",},{id: "news-salt-36-semantics-and-linguistic-theory-se-realizará-en-la-facultad-de-filosofía-y-letras-uba-del-29-al-31-de-julio-de-2026",
          title: 'SALT 36 (Semantics and Linguistic Theory) se realizará en la Facultad de Filosofía...',
          description: "",
          section: "Noticias",},{id: "projects-categorías-funcionales-verbales-y-nominales-en-la-interfaz-sintaxis-semántica",
          title: 'Categorías funcionales verbales y nominales en la interfaz sintaxis-semántica',
          description: "Modalidad, temporalidad, aspectualidad e (in)definitud en el español rioplatense. Instituto de Filología y Literaturas Hispánicas &quot;Dr. Amado Alonso&quot;.",
          section: "Proyectos",handler: () => {
              window.location.href = "/projects/es-ar/1_marcacion_interfaz/";
            },},{id: "projects-patrones-de-duplicación-y-estructura-informativa-en-el-español-de-argentina",
          title: 'Patrones de duplicación y estructura informativa en el español de Argentina',
          description: "Aspectos morfosintácticos, semánticos y pragmáticos de la duplicación pronominal y la estructura de la información en variedades del español argentino. Instituto de Filología y Literaturas Hispánicas &quot;Dr. Amado Alonso&quot;.",
          section: "Proyectos",handler: () => {
              window.location.href = "/projects/es-ar/2_duplicaciones/";
            },},{
        id: 'social-email',
        title: 'Enviar un correo',
        section: 'Redes',
        handler: () => {
          window.open("mailto:%70%61%62%6C%6F%7A%64@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Redes',
        handler: () => {
          window.open("https://github.com/pablozd", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Redes',
        handler: () => {
          window.open("https://orcid.org/0000-0003-2462-5438", "_blank");
        },
      },{
        id: 'social-osf',
        title: 'Open Science Framework',
        section: 'Redes',
        handler: () => {
          window.open("https://osf.io/osf.io/x6vk8/", "_blank");
        },
      },{
        id: 'social-publons',
        title: 'Publons',
        section: 'Redes',
        handler: () => {
          window.open("https://publons.com/a/AFA-9128-2022/", "_blank");
        },
      },{
        id: 'social-researchgate',
        title: 'ResearchGate',
        section: 'Redes',
        handler: () => {
          window.open("https://www.researchgate.net/profile/Pablo-Zdrojewski/", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Redes',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Redes',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=Mhxv04kAAAAJ", "_blank");
        },
      },{
        id: 'social-scopus',
        title: 'Scopus',
        section: 'Redes',
        handler: () => {
          window.open("https://www.scopus.com/authid/detail.uri?authorId=56401914000", "_blank");
        },
      },{
        id: 'social-telegram',
        title: 'telegram',
        section: 'Redes',
        handler: () => {
          window.open("https://telegram.me/pablozd", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Redes',
        handler: () => {
          window.open("https://twitter.com/zd_pablo", "_blank");
        },
      },{
        id: 'social-youtube',
        title: 'YouTube',
        section: 'Redes',
        handler: () => {
          window.open("https://youtube.com/@https://www.youtube.com/@pablozdrojewski1492", "_blank");
        },
      },{
          id: 'lang-en-us',
          title: 'en-us',
          section: 'Idiomas',
          handler: () => {
            window.location.href = "/en-us" + updatedUrl;
          },
        },];
