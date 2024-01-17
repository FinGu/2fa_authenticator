export default {
    Pages: {
        Authenticator:{
            Name: 'Authenticator',
            Texts: {
                CopiedToClipboard: 'Copied the token to the clipboard!'
            }
        },
        Notes:{
            Name: 'Notes',
        },
        Passwords:{
            Name: 'Passwords',
        },
        Home:{
            Name: 'Home'
        },
        Settings:{
            Name: 'Settings',
        },
        AddAuthenticator:{
            Name: 'AddAuthenticator',
            Texts: {
                AddButton: 'Add authenticator'
            }
        },
        ManageAuthenticator:{
            Name: 'ManageAuthenticator',
            Texts: {
                SaveButton: 'Save',
                RemoveButton: 'Remove'
            }
        },
        
    },
    Sections: {
        Main:{
            Title: 'Main',
            Settings: {
                TestBoolean: ['Test boolean', 'boolean'],
                TestString: ['Test string', 'string']
            }
        }
    },
    Prompt:{
        Submit: 'Submit',
        Cancel: 'Cancel'
    },
    Models: {
        Authenticator:{
            NameOrSecretExists: 'The name/secret you\'re trying is already being used',
            InvalidSecret: 'The secret isn\'t valid',
        },
        Unknown: 'Unknown error',
        Ok: 'Ok'
    }
}
