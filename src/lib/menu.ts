// generate <nav> element from a list of menu items and the current page


export const generateMenu = (menuItems: any[], currentPage: string): HTMLElement => {
    const nav = document.createElement('nav');
    menuItems.forEach((menuItem) => {
        const a = document.createElement('a');
        a.href = menuItem.path;
        a.textContent = menuItem.name;
        if (menuItem.url === currentPage) {
            a.classList.add('active');
            a.ariaCurrent = 'true';
        } else {
            a.classList.add('inactive');
            a.ariaCurrent = 'false';
        }
        nav.appendChild(a);
    });
    return nav;
};