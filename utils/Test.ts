
export const is_b32 = (test: string): boolean => {
    let b32_regex = /^[A-Z2-7]+=*$/;

    if(test.length % 8 !== 0 || !b32_regex.exec(test)){
        return false
    }
    
    return true
}

