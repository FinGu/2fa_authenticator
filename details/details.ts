import * as SecureStore from 'expo-secure-store';

namespace details{
    export async function get(key: string): Promise<any | null> {
        let result = await SecureStore.getItemAsync(key.replaceAll(' ', '_'));

        if(result === null){
            return null
        }
        
        let data = null

        try{
            data = JSON.parse(result)
        }
        catch(err){
            return result as string
        }

        return data
    }

    export async function save<T>(key: string, value: Omit<T, number>): Promise<void>{
        let to_save = (typeof value !== 'string') ? JSON.stringify(value) : value

        return await SecureStore.setItemAsync(key.replaceAll(' ', '_'), to_save)
    }

    export async function get_or_default<T>(key: string): Promise<T | string>{
        let data = await details.get(key)

        if(data === null){ 
            await details.save<T | string>(key, '')

            return (await details.get(key))!
        }

        return data
    }
}

export default details;
