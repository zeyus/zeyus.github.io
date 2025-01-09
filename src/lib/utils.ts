export const nth = (d: number) => {
    const dString = String(d);
    const last = +dString.slice(-2);
    if (last > 3 && last < 21) return 'th';
    switch (last % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
};


export const sortPosts = (a: App.VaultEntries, b: App.VaultEntries) => {
    if (a.props.date.getFullYear() !== b.props.date.getFullYear()) {
        return a.props.date.getFullYear() - b.props.date.getFullYear();
    } else if (a.props.date.getMonth() !== b.props.date.getMonth()) {
        return a.props.date.getMonth() - b.props.date.getMonth();
    } else {
        return a.props.date.getDay() - b.props.date.getDay();
    }
};
