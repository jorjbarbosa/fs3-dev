export const errorMessage=(code)=>{
    switch(code){
        case 'auth/email-already-in-use':
            return "Este e-mail já esta cadastrado";
        case 'auth/invalid-email':
            return "E-mail inserido não é valido";
        case 'auth/weak-password':
            return "Senha Inserida é muito fraca";
        case 'auth/network-request-failed':
            return "Houve um problema de conexão, tente novamente";
        case 'auth/too-many-requests':
            return "Muitas tentativas foram realizadas, tente novamente mais tarde";
        default:
            return "Ocorreu um erro inesperado";
    }
}
