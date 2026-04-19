(function () {
    const COOKIE_KEY = 'toolsrapidas_cookie_consent';
    const GA_ID = 'G-984EW75R9H';
    const pageFile = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const SITE_URL = 'https://toolsrapidas.com';

    const banner = document.getElementById('cookieBanner');
    const acceptBtn = document.getElementById('cookieAcceptBtn');
    const rejectBtn = document.getElementById('cookieRejectBtn');
    const categoryPages = {
        'herramientas-para-trabajo.html': { label: 'Trabajo', url: 'herramientas-para-trabajo.html' },
        'herramientas-dev.html': { label: 'Desarrollo', url: 'herramientas-dev.html' },
        'herramientas-seo.html': { label: 'SEO', url: 'herramientas-seo.html' }
    };
    const specialPages = {
        'sobre-toolsrapidas.html': [
            { label: 'Inicio', url: 'index.html' },
            { label: 'Sobre ToolsRapidas', url: 'sobre-toolsrapidas.html' }
        ],
        'guia-de-herramientas-online.html': [
            { label: 'Inicio', url: 'index.html' },
            { label: 'Guía de herramientas', url: 'guia-de-herramientas-online.html' }
        ],
        'contacto.html': [
            { label: 'Inicio', url: 'index.html' },
            { label: 'Contacto', url: 'contacto.html' }
        ],
        'aviso-legal.html': [
            { label: 'Inicio', url: 'index.html' },
            { label: 'Legal', url: 'aviso-legal.html' },
            { label: 'Aviso legal', url: 'aviso-legal.html' }
        ],
        'politica-privacidad.html': [
            { label: 'Inicio', url: 'index.html' },
            { label: 'Legal', url: 'aviso-legal.html' },
            { label: 'Privacidad', url: 'politica-privacidad.html' }
        ],
        'politica-cookies.html': [
            { label: 'Inicio', url: 'index.html' },
            { label: 'Legal', url: 'aviso-legal.html' },
            { label: 'Cookies', url: 'politica-cookies.html' }
        ]
    };
    const toolCategories = {
        trabajo: [
            'calculadora-iva.html', 'calculadora-salario-neto-bruto.html', 'generador-emails-profesionales.html',
            'excel-a-csv.html', 'generador-contratos-simples.html', 'calculadora-horas-trabajadas.html',
            'sumador-tiempo.html', 'enlace-whatsapp.html', 'convertir-horas-a-minutos.html',
            'calcular-fin-jornada.html', 'calculadora-edad-exacta.html', 'dias-entre-fechas.html',
            'pdf-a-word.html', 'unir-pdf.html', 'generador-qr.html', 'convertir-imagen.html',
            'firma-email.html', 'comparador-texto.html', 'limpiador-texto.html', 'quitar-saltos-linea.html',
            'quitar-espacios-duplicados.html', 'mayusculas-a-minusculas.html', 'invertir-texto.html',
            'eliminar-acentos.html', 'generador-contrasenas.html'
        ],
        desarrollo: [
            'visor-json.html', 'comparador-json.html', 'validador-jwt.html', 'decodificador-jwt.html',
            'base64.html', 'uuid-generator.html', 'convertidor-timestamp.html', 'generador-regex.html',
            'regex-tester.html', 'validador-email.html', 'generador-json-fake.html', 'convertidor-json-a-csv.html',
            'generador-sql-insert.html', 'generador-tokens.html', 'formateador-xml.html', 'json-a-xml.html',
            'generador-logs-fake.html', 'generador-datos-fake.html', 'generador-endpoints-mock.html',
            'calculadora-subredes.html', 'pdf-a-texto.html', 'imagen-a-texto.html'
        ],
        seo: [
            'generador-meta-titles-descriptions.html', 'analizador-densidad-palabras-clave.html', 'contador-keywords.html',
            'contador-palabras.html', 'contar-frases.html', 'contador-caracteres-redes.html', 'generador-hashtags.html',
            'contador-bio-instagram.html', 'generador-bios-instagram.html', 'generador-tweets.html',
            'generador-captions-tiktok.html', 'convertir-webp.html', 'compresor-imagenes.html',
            'redimensionar-imagen.html', 'generador-colores.html', 'seo-checklist.html',
            'simulador-serp-google.html', 'generador-slugs-seo.html', 'generador-schema-faq.html',
            'generador-schema-breadcrumb.html', 'validador-meta-tags.html',
            'copiar-texto-invisible.html', 'formatear-whatsapp.html', 'texto-invisible-whatsapp.html',
            'letras-raras.html', 'generador-nombres-usuario.html', 'generador-nombres-empresa.html',
            'generador-nombres-fantasy.html', 'generador-nombres-aleatorios.html'
        ]
    };

    function loadAnalytics() {
        if (window.__trAnalyticsLoaded) {
            return;
        }

        window.__trAnalyticsLoaded = true;

        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
            dataLayer.push(arguments);
        };

        gtag('js', new Date());
        gtag('config', GA_ID);
    }

    function setConsent(value) {
        try {
            localStorage.setItem(COOKIE_KEY, value);
        } catch (_) {
            // Ignore storage failures and keep the banner visible for this session.
        }
    }

    function getConsent() {
        try {
            return localStorage.getItem(COOKIE_KEY);
        } catch (_) {
            return null;
        }
    }

    function hideBanner() {
        if (banner) {
            banner.hidden = true;
        }
    }

    function showBanner() {
        if (banner) {
            banner.hidden = false;
        }
    }

    function findCategoryForPage() {
        if (toolCategories.trabajo.includes(pageFile)) {
            return categoryPages['herramientas-para-trabajo.html'];
        }

        if (toolCategories.desarrollo.includes(pageFile)) {
            return categoryPages['herramientas-dev.html'];
        }

        if (toolCategories.seo.includes(pageFile)) {
            return categoryPages['herramientas-seo.html'];
        }

        return null;
    }

    function buildBreadcrumbs() {
        if (pageFile === 'index.html' || pageFile === 'template.html') {
            return null;
        }

        if (specialPages[pageFile]) {
            return specialPages[pageFile];
        }

        if (categoryPages[pageFile]) {
            return [
                { label: 'Inicio', url: 'index.html' },
                { label: categoryPages[pageFile].label, url: pageFile }
            ];
        }

        const category = findCategoryForPage();
        const currentLabel = document.querySelector('h1') ? document.querySelector('h1').textContent.trim() : document.title.replace(/\s+\|\s+ToolsRapidas.*$/, '');

        if (!category) {
            return [
                { label: 'Inicio', url: 'index.html' },
                { label: currentLabel, url: pageFile }
            ];
        }

        return [
            { label: 'Inicio', url: 'index.html' },
            { label: category.label, url: category.url },
            { label: currentLabel, url: pageFile }
        ];
    }

    function renderBreadcrumbs() {
        const items = buildBreadcrumbs();
        if (!items || document.querySelector('.breadcrumbs')) {
            return;
        }

        const anchor = document.querySelector('header') || document.querySelector('main');
        if (!anchor) {
            return;
        }

        const nav = document.createElement('nav');
        nav.className = 'breadcrumbs';
        nav.setAttribute('aria-label', 'Breadcrumb');

        const list = document.createElement('ol');
        const container = document.createElement('div');
        container.className = 'container';

        items.forEach(function (item, index) {
            const li = document.createElement('li');

            if (index === items.length - 1) {
                const current = document.createElement('span');
                current.textContent = item.label;
                current.setAttribute('aria-current', 'page');
                li.appendChild(current);
            } else {
                const link = document.createElement('a');
                link.href = item.url;
                link.textContent = item.label;
                li.appendChild(link);
            }

            list.appendChild(li);
        });

        container.appendChild(list);
        nav.appendChild(container);
        anchor.parentNode.insertBefore(nav, anchor);
    }

    function renderBreadcrumbSchema() {
        const items = buildBreadcrumbs();
        if (!items || document.querySelector('script[data-tr-breadcrumbs="true"]')) {
            return;
        }

        const schema = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: items.map(function (item, index) {
                return {
                    '@type': 'ListItem',
                    position: index + 1,
                    name: item.label,
                    item: item.url === 'index.html' ? SITE_URL + '/' : SITE_URL + '/' + item.url
                };
            })
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.dataset.trBreadcrumbs = 'true';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
    }

    function ensureFooterUtilityLinks() {
        document.querySelectorAll('.footer-links').forEach(function (footerLinks) {
            if (!footerLinks.querySelector('a[href="guia-de-herramientas-online.html"]')) {
                const guideSeparator = document.createElement('span');
                guideSeparator.textContent = '·';
                const guideLink = document.createElement('a');
                guideLink.href = 'guia-de-herramientas-online.html';
                guideLink.textContent = 'Guía';
                footerLinks.appendChild(guideSeparator);
                footerLinks.appendChild(guideLink);
            }

            if (footerLinks.querySelector('a[href="sobre-toolsrapidas.html"]')) {
                return;
            }

            const contactLink = footerLinks.querySelector('a[href="contacto.html"]');
            if (!contactLink) {
                return;
            }

            const separator = document.createElement('span');
            separator.textContent = '·';
            const aboutLink = document.createElement('a');
            aboutLink.href = 'sobre-toolsrapidas.html';
            aboutLink.textContent = 'Sobre';

            footerLinks.insertBefore(separator, contactLink);
            footerLinks.insertBefore(aboutLink, contactLink);
        });
    }

    renderBreadcrumbs();
    renderBreadcrumbSchema();
    ensureFooterUtilityLinks();

    if (!banner || !acceptBtn || !rejectBtn) {
        return;
    }

    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Preferencias de cookies');

    const consent = getConsent();

    if (consent === 'accepted') {
        loadAnalytics();
        hideBanner();
    } else if (consent === 'rejected') {
        hideBanner();
    } else {
        showBanner();
    }

    acceptBtn.addEventListener('click', function () {
        setConsent('accepted');
        loadAnalytics();
        hideBanner();
    });

    rejectBtn.addEventListener('click', function () {
        setConsent('rejected');
        hideBanner();
    });
})();
