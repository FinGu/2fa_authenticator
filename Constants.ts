export default {
    Pages: {
        Authenticator:{
            Name: 'Authenticator',
            Texts: {
                CopiedToClipboard: 'Copied the token to the clipboard!',
                InitText: 'Add your first 2FA code by clicking on the +'
            }
        },
        Home:{
            Name: 'Home'
        },
        Settings:{
            Name: 'Settings',
            Texts: {
                RadioPromptTitle: 'Manage secrets',
                ImportRadioLabel: 'Import',
                ExportRadioLabel: 'Export',
                BadImportType: 'You tried importing a file with the wrong type',
                BadJSON: 'Bad content',
                ImportedSuccess: 'Imported {} secret(s) successfully'
            }
        },
        AddAuthenticator:{
            Name: 'AddAuthenticator',
            Texts: {
                AddButton: 'Add authenticator'
            }
        },
        QRCode: {
            Name: 'QRCode',
            Texts: {
                BadCode: 'Scanned QR code isn\'t of a 2FA',
                InvalidSecret: 'Scanned code doesn\'t have a valid secret',
                RequestPermission: 'Requesting camera permissions',
                NoCameraAccess: 'No access to camera'
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
