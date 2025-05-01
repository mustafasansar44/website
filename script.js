let currentLanguage = 'tr';
const languages = { tr, en };

function changeLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    updateContent();
}

function updateContent() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getNestedTranslation(languages[currentLanguage], key);
        if (translation) element.textContent = translation;
    });
}

function getNestedTranslation(obj, path) {
    return path.split('.').reduce((acc, curr) => acc ? acc[curr] : null, obj);
}

// Sayfa yüklendiğinde varsayılan dili ayarla
document.addEventListener('DOMContentLoaded', () => {
    changeLanguage(currentLanguage);

    // JavaScript kodu burada (değişiklik yapılmadı)
    // Gezinilecek tüm elemanları sırayla seç
    const tabs = Array.from(document.querySelectorAll('#bios-tabs-nav > span'));
    const profileLinks = Array.from(document.querySelectorAll('#profile-links-list > a'));
    const projectItems = Array.from(document.querySelectorAll('#project-list > li'));
    const languageButtons = Array.from(document.querySelectorAll('#language-selector-buttons > button'));  // TODO: Yeni ekledim bunda da gezinmek istiyorum klavye ile
    
    // Tüm gezinilebilir öğeleri tek bir dizide birleştir
    const navigableElements = [...tabs, ...profileLinks, ...projectItems];

    // Başlangıçta hangi öğenin seçili olacağını belirle (örneğin, 'Portfolio' sekmesi)
    const initialSelectedTab = tabs.find(tab => tab.textContent.trim() === 'Portfolio') || tabs[0]; // Portfolio'yu bulamazsa ilkini seç
    let selectedIndex = navigableElements.indexOf(initialSelectedTab); // Başlangıç indeksi

    // Seçim sınıfları
    const tabSelectedClass = 'selected'; // Kırmızı arka planlı ana sekme
    const tabKbSelectedClass = 'kb-selected-tab'; // Diğer sekmelerin klavye ile seçilme stili
    const linkProjectKbSelectedClass = 'kb-selected'; // Profil linkleri ve projeler için klavye seçim stili

    // --- Seçimi Güncelleme Fonksiyonu ---
    function selectElement(index) {
        // 1. Önceki seçimi temizle
        if (selectedIndex !== -1 && selectedIndex < navigableElements.length && navigableElements[selectedIndex]) {
            const prevElement = navigableElements[selectedIndex];
            prevElement.classList.remove(tabSelectedClass, tabKbSelectedClass, linkProjectKbSelectedClass);
        }

        // 2. Yeni indeksi ayarla (dizi sınırları içinde)
        if (index < 0) {
            selectedIndex = 0;
        } else if (index >= navigableElements.length) {
            selectedIndex = navigableElements.length - 1;
        } else {
            selectedIndex = index;
        }

        // 3. Yeni öğeyi vurgula
        const currentElement = navigableElements[selectedIndex];
        if (currentElement) {
            // Eleman tipine göre doğru sınıfı ekle
            if (tabs.includes(currentElement)) {
                // Eğer bu sekme başlangıçta seçili olan (Portfolio) ise ana stili, değilse klavye stilini kullan
                if (currentElement === initialSelectedTab) { // === ile karşılaştır
                    currentElement.classList.add(tabSelectedClass);
                } else {
                    currentElement.classList.add(tabKbSelectedClass);
                }
            } else { // Profil linki veya Proje li
                currentElement.classList.add(linkProjectKbSelectedClass);
            }

            // Görünür alana kaydır
            // Sadece dikey kaydırma yapalım, sekmelerde yatay kaydırma sorun çıkarabilir
            currentElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' /*, inline: 'nearest'*/ });
        }
    }

    // --- Klavye Olay Dinleyicisi ---
    document.addEventListener('keydown', (event) => {
        if (!navigableElements.length) return; // Eleman yoksa çık

        // Odak body veya container üzerindeyken çalışmasını sağla (input vb. varsa engelleme)
        if (document.activeElement && document.activeElement !== document.body && !document.querySelector('.bios-container').contains(document.activeElement)) {
            // Eğer odak başka bir etkileşimli elemanda ise BIOS navigasyonunu çalıştırma
            // return; // Bu satır input alanları vs. eklenirse gerekebilir
        }

        const currentElement = navigableElements[selectedIndex];
        const isTab = tabs.includes(currentElement);
        //const isProfileLink = profileLinks.includes(currentElement); // Aşağıda ArrowUp/Down içinde tanımlı
        //const isProjectItem = projectItems.includes(currentElement); // Aşağıda ArrowUp/Down içinde tanımlı

        let targetIndex = selectedIndex; // Hedeflenen yeni index

        switch (event.key) {
            case 'ArrowDown': { // Scope için {} kullanmak iyi pratik
                event.preventDefault();
                const isProfileLink = profileLinks.includes(currentElement);
                const isProjectItem = projectItems.includes(currentElement);

                if (isTab) {
                    // Sekmeden sonra ilk profil linki varsa ona git, yoksa ilk projeye
                    targetIndex = navigableElements.indexOf(profileLinks[0] || projectItems[0] || currentElement);
                } else if (isProfileLink) {
                    // Profil linkinden sonra ilk proje varsa ona git
                    const currentLinkIndex = profileLinks.indexOf(currentElement);
                    // Profil linklerindeyken aşağı ok her zaman ilk projeye gitsin (daha tutarlı)
                    if (projectItems.length > 0) {
                        targetIndex = navigableElements.indexOf(projectItems[0]);
                    } else {
                        // Proje yoksa yerinde kal
                        targetIndex = selectedIndex;
                    }
                } else if (isProjectItem) {
                    // Proje listesinde aşağı in
                    const currentItemIndex = projectItems.indexOf(currentElement);
                    if (currentItemIndex < projectItems.length - 1) {
                        targetIndex = navigableElements.indexOf(projectItems[currentItemIndex + 1]);
                    } // else: son projede kal
                }
                selectElement(targetIndex);
                break;
            }

            case 'ArrowUp': {
                event.preventDefault();
                const isProfileLink = profileLinks.includes(currentElement);
                const isProjectItem = projectItems.includes(currentElement);

                if (isProjectItem) {
                    // Proje listesinde yukarı çık
                    const currentItemIndex = projectItems.indexOf(currentElement);
                    if (currentItemIndex > 0) {
                        targetIndex = navigableElements.indexOf(projectItems[currentItemIndex - 1]);
                    } else {
                        // İlk projedeysek, son profil linkine git (varsa), yoksa son sekmeye
                        targetIndex = navigableElements.indexOf(profileLinks.length > 0 ? profileLinks[profileLinks.length - 1] : (tabs.length > 0 ? tabs[tabs.length - 1] : currentElement));
                    }
                } else if (isProfileLink) {
                    // Profil listesindeyken yukarı ok her zaman son (veya ilgili) sekmeye gitsin
                    // Şimdilik basitçe ilk sekmeye gitsin
                    targetIndex = navigableElements.indexOf(tabs[0] || currentElement);
                    // Daha gelişmiş: Hangi sekmenin altında olduğunu takip edip ona dönülebilir.
                } else if (isTab) {
                    // Sekmelerde yukarı ok bir şey yapmasın
                    targetIndex = selectedIndex;
                }
                selectElement(targetIndex);
                break;
            }


            case 'ArrowRight':
                event.preventDefault(); // Her durumda sağ/sol okların sayfa kaydırmasını engelle
                if (isTab) { // Sekmelerde sağa git
                    const currentTabIndex = tabs.indexOf(currentElement);
                    const nextTabIndex = (currentTabIndex + 1);
                    if (nextTabIndex < tabs.length) {
                        targetIndex = navigableElements.indexOf(tabs[nextTabIndex]);
                        selectElement(targetIndex);
                    }
                }
                // Profil linklerinde sağ ok sonraki linke gitsin
                else if (profileLinks.includes(currentElement)) {
                    const currentLinkIndex = profileLinks.indexOf(currentElement);
                    const nextLinkIndex = currentLinkIndex + 1;
                    if (nextLinkIndex < profileLinks.length) {
                        targetIndex = navigableElements.indexOf(profileLinks[nextLinkIndex]);
                        selectElement(targetIndex);
                    }
                }
                // Proje listesinde sağ ok bir şey yapmaz
                break;

            case 'ArrowLeft':
                event.preventDefault(); // Her durumda sağ/sol okların sayfa kaydırmasını engelle
                if (isTab) { // Sekmelerde sola git
                    const currentTabIndex = tabs.indexOf(currentElement);
                    const prevTabIndex = (currentTabIndex - 1);
                    if (prevTabIndex >= 0) {
                        targetIndex = navigableElements.indexOf(tabs[prevTabIndex]);
                        selectElement(targetIndex);
                    }
                }
                // Profil linklerinde sol ok önceki linke gitsin
                else if (profileLinks.includes(currentElement)) {
                    const currentLinkIndex = profileLinks.indexOf(currentElement);
                    const prevLinkIndex = currentLinkIndex - 1;
                    if (prevLinkIndex >= 0) {
                        targetIndex = navigableElements.indexOf(profileLinks[prevLinkIndex]);
                        selectElement(targetIndex);
                    }
                }
                // Proje listesinde sol ok bir şey yapmaz
                break;

            case 'Enter':
                if (currentElement) {
                    let linkToOpen = null;
                    const isProfileLink = profileLinks.includes(currentElement);
                    const isProjectItem = projectItems.includes(currentElement);

                    if (isProfileLink) { // Seçili öğe bir profil linki (kendisi link)
                        linkToOpen = currentElement;
                    } else if (isProjectItem) { // Seçili öğe bir proje listesi elemanı
                        linkToOpen = currentElement.querySelector('a.project-link'); // İçindeki linki bul
                    }

                    if (linkToOpen && linkToOpen.href && linkToOpen.href !== 'PROJE_LINKI_1' /* Gerçek linkleri kontrol et */) {
                        event.preventDefault();
                        // Placeholder linkleri açmamak için kontrol eklenebilir:
                        // if (!linkToOpen.href.includes('PROJE_LINKI')) {
                        window.open(linkToOpen.href, '_blank');
                        // }
                    }
                    // Sekmelerde Enter'a basınca bir şey yapmıyoruz.
                }
                break;

            case 'Home':
                event.preventDefault();
                // Home: İlk sekmeye git (veya ilk elemana)
                targetIndex = navigableElements.indexOf(tabs[0] || navigableElements[0]);
                selectElement(targetIndex);
                break;

            case 'End':
                event.preventDefault();
                // End: Son proje öğesine git (veya son elemana)
                targetIndex = navigableElements.indexOf(projectItems.length > 0 ? projectItems[projectItems.length - 1] : navigableElements[navigableElements.length - 1]);
                selectElement(targetIndex);
                break;
        }
    });

    // --- Fare Etkileşimleri ---
    navigableElements.forEach((element, index) => {
        element.addEventListener('mouseenter', () => {
            // Fare üzerine gelince de seçimi güncelle (klavye seçimini takip etsin)
            selectElement(index);
        });

        element.addEventListener('click', (e) => {
            // Sekmelere tıklanınca seçimi oraya getir (Enter gibi davranmasın)
            if (tabs.includes(element)) {
                selectElement(index); // Zaten mouseenter yapıyor ama yine de ekleyelim.
            }
            // Profil linkine tıklama zaten yeni sekmede açar (varsayılan davranış)

            // Proje li elementine tıklayınca içindeki linki açalım (Enter gibi)
            else if (projectItems.includes(element)) {
                const link = element.querySelector('a.project-link');
                if (link && link.href && link.href !== 'PROJE_LINKI_1' /* Gerçek linkleri kontrol et */) {
                    // Sadece li'nin boş alanına veya link olmayan span'lara tıklanınca açsın
                    // (Linke tıklanınca zaten açılır)
                    if (e.target === element || e.target.closest('span')) {
                        // Linkin kendisine tıklanmadıysa aç (closest 'a' değilse)
                        if (!e.target.closest('a')) {
                            // if (!link.href.includes('PROJE_LINKI')) {
                            window.open(link.href, '_blank');
                            // }
                        }
                    }
                }
            }
        });
    });

    // --- Başlangıç Seçimi ---
    if (selectedIndex < 0 || selectedIndex >= navigableElements.length) {
        selectedIndex = 0; // Eğer başlangıç öğesi bulunamadıysa veya geçersizse ilkini seç
    }
    // Sayfa yüklendiğinde ilk seçimi uygula
    if (navigableElements.length > 0) {
        // Küçük bir gecikme ekleyerek ilk scrollIntoView'un daha düzgün çalışmasını sağlayabiliriz.
        setTimeout(() => {
            selectElement(selectedIndex);
        }, 50);
    }
});