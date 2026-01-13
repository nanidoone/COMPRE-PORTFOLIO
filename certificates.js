document.addEventListener("DOMContentLoaded", () => {
    const certificates = document.querySelectorAll('.certificate-item');
    const modalOverlay = document.getElementById('certificateModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');

    const certificateImages = {
        an: 'certificates/one.png',
        on: 'certificates/two.png',
        enz: 'certificates/tree.png',
        in: 'certificates/four.png',
        un: 'certificates/five.png',
       
    };

    certificates.forEach(cert => {
        cert.addEventListener('click', () => {
            const certName = cert.dataset.certificate;
            modalImage.src = certificateImages[certName]; // exact file path
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // prevent background scroll
        });
    });

    closeModal.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        modalImage.src = ''; // reset
        document.body.style.overflow = 'auto';
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            modalImage.src = ''; // reset
            document.body.style.overflow = 'auto';
        }
    });
});
