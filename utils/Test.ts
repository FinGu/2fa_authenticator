
export const is_b32 = (str: string): boolean => {
    let b32_regex = /^[A-Z2-7]+=*$/;

    if(str.length % 8 !== 0 || !b32_regex.test(str)){
        return false
    }
    
    return true
}

