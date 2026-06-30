
const currentUrl = window.location.href;
const siteUrl = "https://pablozd.ar"; 
let updatedUrl = currentUrl.replace("https://pablozd.ar", "");
if (currentUrl.length == updatedUrl.length && currentUrl.startsWith("http://127.0.0.1")) {
  const otherSiteUrl = siteUrl.replace("localhost", "127.0.0.1");
  updatedUrl = currentUrl.replace(otherSiteUrl + "", "");
}
if ("en-us".length > 0) {
  updatedUrl = updatedUrl.replace("/en-us", "");
}
// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation menu",
    handler: () => {
      window.location.href = "/en-us/";
    },
  },{id: "nav-research",
          title: "research",
          description: "Projects, publications, talks and drafts.",
          section: "Navigation menu",
          handler: () => {
            window.location.href = "/en-us/research/";
          },
        },{id: "nav-teaching",
          title: "teaching",
          description: "",
          section: "Navigation menu",
          handler: () => {
            window.location.href = "/en-us/teaching/";
          },
        },{id: "nav-tools",
          title: "tools",
          description: "Web apps and LaTeX packages developed for research and teaching.",
          section: "Navigation menu",
          handler: () => {
            window.location.href = "/en-us/tools/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation menu",
          handler: () => {
            window.location.href = "/en-us/cv/";
          },
        },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "",handler: () => {
              window.location.href = "/en-us/books/en-us/the_godfather/";
            },},{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "",handler: () => {
              window.location.href = "/en-us/books/pt-br/the_godfather/";
            },},{id: "news-new-edition-of-the-cuex-critical-and-practical-integration-of-generative-ai-in-the-teaching-of-humanities-and-social-sciences-with-fernando-carranza-ángel-maldonado-and-mariano-vilar-ffyl-uba-starts-july-18-online",
          title: 'New edition of the CUEX “Critical and practical integration of generative AI in...',
          description: "",
          section: "News",},{id: "news-salt-36-semantics-and-linguistic-theory-will-be-held-at-facultad-de-filosofía-y-letras-uba-july-29-31-2026",
          title: 'SALT 36 (Semantics and Linguistic Theory) will be held at Facultad de Filosofía...',
          description: "",
          section: "News",},{id: "projects-verbal-and-nominal-functional-categories-at-the-syntax-semantics-interface",
          title: 'Verbal and nominal functional categories at the syntax-semantics interface',
          description: "Modality, tense, aspect and (in)definiteness in Rioplatense Spanish. Instituto de Filología y Literaturas Hispánicas &quot;Dr. Amado Alonso&quot;.",
          section: "Projects",handler: () => {
              window.location.href = "/en-us/projects/en-us/7_marcacion_interfaz/";
            },},{id: "projects-duplication-patterns-and-information-structure-in-argentine-spanish",
          title: 'Duplication patterns and information structure in Argentine Spanish',
          description: "Morphosyntactic, semantic and pragmatic aspects of pronominal duplication and information structure in varieties of Argentine Spanish. Instituto de Filología y Literaturas Hispánicas &quot;Dr. Amado Alonso&quot;.",
          section: "Projects",handler: () => {
              window.location.href = "/en-us/projects/en-us/8_duplicaciones/";
            },},{
        id: 'social-email',
        title: 'Send an email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%70%61%62%6C%6F%7A%64@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/pablozd", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0000-0003-2462-5438", "_blank");
        },
      },{
        id: 'social-osf',
        title: 'Open Science Framework',
        section: 'Socials',
        handler: () => {
          window.open("https://osf.io/osf.io/x6vk8/", "_blank");
        },
      },{
        id: 'social-publons',
        title: 'Publons',
        section: 'Socials',
        handler: () => {
          window.open("https://publons.com/a/AFA-9128-2022/", "_blank");
        },
      },{
        id: 'social-researchgate',
        title: 'ResearchGate',
        section: 'Socials',
        handler: () => {
          window.open("https://www.researchgate.net/profile/Pablo-Zdrojewski/", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=Mhxv04kAAAAJ", "_blank");
        },
      },{
        id: 'social-scopus',
        title: 'Scopus',
        section: 'Socials',
        handler: () => {
          window.open("https://www.scopus.com/authid/detail.uri?authorId=56401914000", "_blank");
        },
      },{
        id: 'social-telegram',
        title: 'telegram',
        section: 'Socials',
        handler: () => {
          window.open("https://telegram.me/pablozd", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Socials',
        handler: () => {
          window.open("https://twitter.com/zd_pablo", "_blank");
        },
      },{
        id: 'social-youtube',
        title: 'YouTube',
        section: 'Socials',
        handler: () => {
          window.open("https://youtube.com/@https://www.youtube.com/@pablozdrojewski1492", "_blank");
        },
      },{
          id: 'lang-es-ar',
          title: 'es-ar',
          section: 'Languages',
          handler: () => {
            window.location.href = "" + updatedUrl;
          },
        },];
