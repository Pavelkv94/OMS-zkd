// Multilanguage: EN uses outsourcing-menu, solutions-menu, footer; RU uses *-ru ids
var isRu = !!document.getElementById('outsourcing-menu-ru');
var commonBase = isRu ? '/common/ru/' : '/common/en/';
var homeUrl = isRu ? '/ru/' : '/';

// Logo links: point to language-specific home (EN: /, RU: /ru/)
function setLogoLinks() {
    var wrapper = document.querySelector('.main-container header:first-child a.logo-wrapper');
    if (wrapper) wrapper.setAttribute('href', homeUrl);
    var mobileHeader = document.querySelector('.main-container header:nth-child(2)');
    if (mobileHeader) {
        var firstDiv = mobileHeader.querySelector('div:first-child');
        if (firstDiv) {
            var mobileLink = firstDiv.querySelector('a[href]');
            if (mobileLink) {
                mobileLink.setAttribute('href', homeUrl);
            } else {
                var img = firstDiv.querySelector('img');
                if (img) {
                    var a = document.createElement('a');
                    a.href = homeUrl;
                    a.appendChild(img.cloneNode(true));
                    firstDiv.innerHTML = '';
                    firstDiv.appendChild(a);
                }
            }
        }
    }
}
setLogoLinks();
var menuIds = isRu
    ? {
        outsourcing: 'outsourcing-menu-ru',
        solutions: 'solutions-menu-ru',
        outsourcingMobile: 'outsourcing-menu-mobile-ru',
        solutionsMobile: 'solutions-menu-mobile-ru',
    }
    : {
        outsourcing: 'outsourcing-menu',
        solutions: 'solutions-menu',
        outsourcingMobile: 'outsourcing-menu-mobile',
        solutionsMobile: 'solutions-menu-mobile',
    };

// Desktop: outsourcing
var outsourcingMenu = document.getElementById(menuIds.outsourcing);
if (outsourcingMenu) {
    fetch(commonBase + 'header/outsourcing.menu.html')
        .then(function (r) { return r.text(); })
        .then(function (data) { outsourcingMenu.innerHTML = data; })
        .catch(function (e) { console.error('Error loading outsourcing menu:', e); });
}

// Desktop: solutions
var solutionsMenu = document.getElementById(menuIds.solutions);
if (solutionsMenu) {
    fetch(commonBase + 'header/solutions.menu.html')
        .then(function (r) { return r.text(); })
        .then(function (data) { solutionsMenu.innerHTML = data; })
        .catch(function (e) { console.error('Error loading solutions menu:', e); });
}

// Mobile: outsourcing
var outsourcingMenuMobile = document.getElementById(menuIds.outsourcingMobile);
if (outsourcingMenuMobile) {
    fetch(commonBase + 'header/outsourcing.menu.mobile.html')
        .then(function (r) { return r.text(); })
        .then(function (data) {
            outsourcingMenuMobile.innerHTML = data;
            var subMenu1 = document.querySelector('.first-submenu-mobile');
            var subItem1 = document.querySelector('.first-sub-item');
            if (subMenu1 && subItem1) {
                subMenu1.addEventListener('click', function () {
                    subItem1.classList.toggle('active');
                });
            }
        })
        .catch(function (e) { console.error('Error loading outsourcing menu mobile:', e); });
}

// Mobile: solutions
var solutionsMenuMobile = document.getElementById(menuIds.solutionsMobile);
if (solutionsMenuMobile) {
    fetch(commonBase + 'header/solutions.menu.mobile.html')
        .then(function (r) { return r.text(); })
        .then(function (data) {
            solutionsMenuMobile.innerHTML = data;
            var subMenu2 = document.querySelector('.second-submenu-mobile');
            var subItem2 = document.querySelector('.second-sub-item');
            if (subMenu2 && subItem2) {
                subMenu2.addEventListener('click', function () {
                    subItem2.classList.toggle('active');
                });
            }
        })
        .catch(function (e) { console.error('Error loading solutions menu mobile:', e); });
}

// Language switcher: EN main /, RU main /ru/, subpages /pages/en/ and /pages/ru/
function getLangUrls() {
    var path = (window.location.pathname || '/').replace(/\/$/, '') || '/';
    var enUrl, ruUrl;
    if (path === '/') {
        enUrl = '/';
        ruUrl = '/ru/';
    } else if (path === '/ru') {
        enUrl = '/';
        ruUrl = '/ru/';
    } else if (path.indexOf('/pages/ru/') === 0) {
        enUrl = '/pages/en/' + path.slice(10) + '/';
        ruUrl = path + '/';
    } else if (path.indexOf('/pages/en/') === 0) {
        enUrl = path + '/';
        ruUrl = '/pages/ru/' + path.slice(10) + '/';
    } else {
        enUrl = '/';
        ruUrl = '/ru/';
    }
    return { enUrl: enUrl, ruUrl: ruUrl };
}

function createLangSwitcherHtml(urls, current) {
    return '<a href="' + urls.enUrl + '" data-lang="en" class="' + (current === 'en' ? 'active' : '') + '">EN</a>' +
        ' <span class="lang-sep">|</span> ' +
        '<a href="' + urls.ruUrl + '" data-lang="ru" class="' + (current === 'ru' ? 'active' : '') + '">RU</a>';
}

function injectLangSwitcher() {
    var urls = getLangUrls();
    var current = isRu ? 'ru' : 'en';
    var html = createLangSwitcherHtml(urls, current);

    // Desktop: right side of first header section
    var headerSection = document.querySelector('.main-container header:first-child section');
    if (headerSection) {
        var div = document.createElement('div');
        div.className = 'lang-switcher';
        div.innerHTML = html;
        headerSection.appendChild(div);
        div.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function (e) {
                if (a.classList.contains('active')) e.preventDefault();
            });
        });
    }

    // Mobile: in second header (mobile bar), before burger button
    var mobileHeader = document.querySelector('.main-container header:nth-child(2)');
    if (mobileHeader) {
        var menuBtn = mobileHeader.querySelector('.menu-btn');
        var mobileSwitcher = document.createElement('div');
        mobileSwitcher.className = 'lang-switcher lang-switcher-mobile';
        mobileSwitcher.innerHTML = html;
        mobileHeader.insertBefore(mobileSwitcher, menuBtn);
        mobileSwitcher.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function (e) {
                if (a.classList.contains('active')) e.preventDefault();
            });
        });
    }

    // Mobile: inside slide-out menu (at top of list)
    var slideMenu = document.querySelector('.menu');
    if (slideMenu) {
        var menuList = slideMenu.querySelector('ul');
        if (menuList) {
            var menuSwitcher = document.createElement('li');
            menuSwitcher.className = 'lang-switcher-menu';
            menuSwitcher.innerHTML = '<div class="lang-switcher">' + html + '</div>';
            menuList.insertBefore(menuSwitcher, menuList.firstChild);
            menuSwitcher.querySelectorAll('a').forEach(function (a) {
                a.addEventListener('click', function (e) {
                    if (a.classList.contains('active')) e.preventDefault();
                });
            });
        }
    }
}
injectLangSwitcher();

var menuBtn = document.querySelector('.menu-btn');
var menu = document.querySelector('.menu');
if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {
        menuBtn.classList.toggle('active');
        menu.classList.toggle('active');
    });
}

// Go Up
document.addEventListener('DOMContentLoaded', function () {
    var toTopBtn = document.querySelector('.to-up');
    var toTopBtnMobile = document.querySelector('.to-up-mobile');

    window.onscroll = function () {
        if (window.pageYOffset > 580 && window.innerWidth > 640) {
            toTopBtn.style.display = 'block';
        } else {
            toTopBtn.style.display = 'none';
        }
        if (window.pageYOffset > 200 && window.innerWidth < 640) {
            toTopBtnMobile.style.display = 'block';
        } else {
            toTopBtnMobile.style.display = 'none';
        }
    };

    if (toTopBtn) {
        toTopBtn.addEventListener('click', function () {
            window.scrollBy({ top: -document.documentElement.scrollHeight, behavior: 'smooth' });
        });
    }
    if (toTopBtnMobile) {
        toTopBtnMobile.addEventListener('click', function () {
            window.scrollBy({ top: -document.documentElement.scrollHeight, behavior: 'smooth' });
        });
    }
});

function setCopyYear(id, text) {
    var el = document.getElementById(id);
    if (!el) return;
    var year = new Date().getFullYear();
    el.innerHTML = text.replace('{year}', year);
}

var footerDiv = document.getElementById('footer');
var footerRu = document.getElementById('footer-ru');
var footerTarget = footerRu || footerDiv;
if (footerTarget) {
    var footerUrl = isRu ? '/common/ru/footer.html' : '/common/en/footer.html';
    fetch(footerUrl)
        .then(function (r) { return r.text(); })
        .then(function (data) {
            footerTarget.innerHTML = data;
            if (isRu) {
                setCopyYear('copyright-ru', '© {year} Zakodix Tech Group LLC. Все права защищены.');
            } else {
                setCopyYear('copyright', 'Copyright © {year} Zakodix Tech Group LLC. All rights reserved.');
            }
        })
        .catch(function (e) { console.error('Error loading footer:', e); });
}
