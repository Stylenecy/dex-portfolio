// System Log
console.log("Dex — Reforging Phase active.");

document.addEventListener('DOMContentLoaded', () => {
    
    // ==============================================
    // 1. SCROLL REVEAL ENGINE (Visual Animation)
    // ==============================================
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active'); 
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(element => {
        revealObserver.observe(element);
    });


    // ==============================================
    // 2. SMOOTH GLIDE SYSTEM (Navigation Click)
    // ==============================================
    const dockLinks = document.querySelectorAll('.dock-item');

    dockLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Matikan fungsi default (lompat instan)
            e.preventDefault();

            // Ambil tujuan (misal: #projects)
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            // Kalau tujuannya ada, luncurkan!
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    // ==============================================
    // 3. ACTIVE RADAR (Update Dock saat Scroll)
    // ==============================================
    const sections = document.querySelectorAll('section'); // Ambil semua section
    
    const observerOptions = {
        threshold: 0.3 // Section dianggap aktif kalau 30% kelihatan
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ambil ID section yang lagi kelihatan (misal: "projects")
                const currentId = entry.target.getAttribute('id');
                
                // Loop semua tombol dock buat update warnanya
                dockLinks.forEach(link => {
                    // Hapus class active dari semua tombol dulu
                    link.classList.remove('active');
                    
                    // Kalau href tombol cocok sama ID section, kasih active
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

});