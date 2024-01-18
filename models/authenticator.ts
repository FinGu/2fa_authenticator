import { is_b32 } from '../utils/Test';

import { Authenticator } from '@otplib/core';
import { keyDecoder, keyEncoder } from '@otplib/plugin-thirty-two';

import { createDigest, createRandomBytes } from '@otplib/plugin-crypto-js';

const authenticator = new Authenticator({
    createDigest,
    createRandomBytes,
    keyDecoder,
    keyEncoder
})

import details from '../details/details';
import Constants from '../Constants';

const authenticator_settings_name = 'authenticator_secrets'

type authenticator_secret = {
    name: string,
    secret: string
}

export const authenticator_errors = {
    NAME_OR_SECRET_ALREADY_EXISTS: Constants.Models.Authenticator.NameOrSecretExists,
    INVALID_SECRET: Constants.Models.Authenticator.InvalidSecret,
    UNKNOWN: Constants.Models.Unknown,
    OK: Constants.Models.Ok
} as const;

type authenticator_error = typeof authenticator_errors[keyof typeof authenticator_errors];

const fetch_secrets = async (): Promise<authenticator_secret[]> => {
    let codes = await details.get(authenticator_settings_name)

    if(!codes){
        return []
    }

    return codes
}

const fetch_single_secret = async(name: string): Promise<authenticator_secret | undefined> => {
    let secrets = await fetch_secrets() 

    return secrets.find(secret => secret.name === name)
}

const add_secret = async(to_add: authenticator_secret): Promise<authenticator_secret[] | authenticator_error> => {
    let codes: authenticator_secret[] | null = await details.get(authenticator_settings_name)

    if(!codes){
        codes = []
    }

    if(!is_b32(to_add.secret)){
        return authenticator_errors.INVALID_SECRET
    }

    if(codes.some(code => code.name === to_add.name || code.secret === to_add.secret)){
        return authenticator_errors.NAME_OR_SECRET_ALREADY_EXISTS
    }

    codes.push(to_add)

    await details.save(authenticator_settings_name, codes)

    return codes
}

const save_secret = async(original_name: string, new_data: authenticator_secret): Promise<authenticator_error> => {
    let codes = await delete_secret(original_name)

    if(!is_b32(new_data.secret)){
        return authenticator_errors.INVALID_SECRET
    }

    if(codes.some(code => code.name === new_data.name || code.secret === new_data.secret)){
        return authenticator_errors.NAME_OR_SECRET_ALREADY_EXISTS
    }

    codes.push(new_data)

    await details.save(authenticator_settings_name, codes)

    return authenticator_errors.OK
}

//to_delete: name
const delete_secret = async(to_delete_name: string): Promise<authenticator_secret[]> => {
    let codes: authenticator_secret[] = await details.get(authenticator_settings_name)!
    
    codes = codes.filter(code => code.name !== to_delete_name)

    await details.save(authenticator_settings_name, codes)

    return codes
}
 
export type generated_token = {
    name: string,
    token: string
}

const generate_tokens = async(): Promise<generated_token[]> => {
    let tokens: generated_token[] = []

    let secrets = await fetch_secrets()

    for(const secret of secrets){
        tokens.push({
            name: secret.name,
            token: authenticator.generate(secret.secret),
        })
    }

    return tokens
}

const get_time_remaining = () => {
    return authenticator.timeRemaining()
}

export {authenticator_secret, authenticator_error, fetch_secrets, generate_tokens, add_secret, save_secret, delete_secret, fetch_single_secret, get_time_remaining}

