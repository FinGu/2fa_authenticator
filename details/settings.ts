type settings_type = "boolean" | "string"

type settings_element = {
    name: string,
    type: settings_type,
    value?: string
}

type settings_section = {
    title: string,
    icon?: JSX.Element,
    data: settings_element[]
}

type settings_state = {
    [key: string]: any
}

export {settings_type, settings_element, settings_section, settings_state}
