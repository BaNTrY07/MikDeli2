// Scroll lin pentru toate linkurile din navbar

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {

        const target = this.getAttribute('href');

        if(target.startsWith('#')){
            e.preventDefault();

            document.querySelector(target).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


// Buton Contactează-ne

const contactBtn = document.querySelector('.btn');

contactBtn.addEventListener('click', function(e){
    e.preventDefault();

    document.querySelector('#contact').scrollIntoView({
        behavior:'smooth'
    });
});


// Evidențiere meniu activ

window.addEventListener('scroll', () => {

    const sections = document.querySelectorAll('section');

    const navLinks = document.querySelectorAll('nav a');

    let current = '';

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if(window.scrollY >= sectionTop){
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {

        link.classList.remove('active');

        if(link.getAttribute('href') === '#' + current){
            link.classList.add('active');
        }
    });
});

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }

    });

});

document.querySelectorAll("section").forEach(section => {

    section.classList.add("hidden");

    observer.observe(section);

});

function updateStatus(){

    const status = document.getElementById("status");

    const now = new Date();
    const hour = now.getHours();

    // Program:
    // L-V: 08:00 - 20:00
    // Sâmbătă: 09:00 - 18:00
    // Duminică: închis

    const day = now.getDay(); // 0 = Duminică, 6 = Sâmbătă

    let isOpen = false;

    if(day >= 1 && day <= 5){
        // Luni - Vineri
        isOpen = hour >= 8 && hour < 20;
    }
    else if(day === 6){
        // Sâmbătă
        isOpen = hour >= 9 && hour < 18;
    }
    else{
        // Duminică
        isOpen = false;
    }

    if(isOpen){
        status.textContent = "🟢 Deschis acum";
        status.classList.add("open");
        status.classList.remove("closed");
    }
    else{
        status.textContent = "🔴 Închis acum";
        status.classList.add("closed");
        status.classList.remove("open");
    }
}

// rulează imediat
updateStatus();

// update la fiecare minut
setInterval(updateStatus, 60000);