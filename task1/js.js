const btn = document.querySelector('.j-btn-test');

btn.addEventListener('click', () => {
    const icon = document.querySelector('.btn_icon');
    const icon_hiden = document.querySelector('.btn_icon_hiden');
    icon.className = 'btn_icon_hiden';
    icon_hiden.className = 'btn_icon';
});