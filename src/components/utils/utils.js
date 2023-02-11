export const mapToColums = (arr) => {
    if(arr.length === 0) return [{}];
    const result = [];
    result[0] = {first: arr[0]};
    let n = 0;
    for (let i = 1; i < arr.length; i++) {
        if(i % 2 === 0) {
            n++;
            result[n] = {...result[n], first: arr[i]}
        } else {
            result[n] = {...result[n], second: arr[i]}
        }
    }
    return result;
}

export const filter = (ingredients, current) => {
    return ingredients.filter(item => item.type === current);  
}
