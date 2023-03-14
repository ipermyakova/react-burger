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

export const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

 export const setCookie = (name, value, props) => {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
      const d = new Date();
      d.setTime(d.getTime() + exp * 1000);
      exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
      props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
      updatedCookie += '; ' + propName;
      const propValue = props[propName];
      if (propValue !== true) {
        updatedCookie += '=' + propValue;
      }
    }
    document.cookie = updatedCookie;
  }

 export const getCookie = (name) =>  {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const deleteCookie = (name) => {
	setCookie(name, null, {expires: -1 });
}
