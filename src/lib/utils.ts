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

export function findInSet<Type>(set: Set<Type>, test: (o: Type) => boolean): Type | undefined { 
    for (const item of set) if(test(item)) return item;
};

export function filterSet<Type>(set: Set<Type>, test: (o: Type) => boolean): Array<Type> {
    const result: Type[] = [];
    for (const item of set) if(test(item)) result.push(item);
    return result;
}

export function indexOfSet<Type>(set: Set<Type>, other: Type): number { 
    let i = 0;
    for (const item of set) {
        if(item === other) return i;
        i++;
    }
    return -1;
}
