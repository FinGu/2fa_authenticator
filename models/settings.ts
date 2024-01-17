import details from "../details/details";
import { settings_type, settings_element } from "../details/settings"; 

const generate_settings = async (settings: [string, settings_type][]): Promise<settings_element[]> => {
    let out: settings_element[] = []

    for(const setting of settings){
        let data = await details.get_or_default<string>(setting[0])

        out.push({
            name: setting[0],
            type: setting[1],
            value: data
        })
    }

    return out
}

export {generate_settings}
