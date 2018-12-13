
export default class UserRepository{

    constructor(rest){
        this.rest = rest;
    }

    async login(mobile, password){
        return  this.rest.get(`login/${mobile}/${password}`);
    }

    async register(mobile){
        return  this.rest.get(`register/${mobile}`);
    }

    async verifyOTP(mobile, otp){
        return  this.rest.get(`register/verify/${mobile}/${otp}`);
    }

}