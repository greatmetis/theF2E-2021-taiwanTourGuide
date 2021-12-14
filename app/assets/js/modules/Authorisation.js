//* ----- Authorisation ----- *//
const getAuthorisationHeader =()=> {
    //  填入自己 ID、KEY 開始
        let AppID = '9a39a027224b4cf6ab8546f4e39f95f0';
        let AppKey = 'z5nsCLInB74TT565xhsCwYEKOwg';
    //  填入自己 ID、KEY 結束
        let GMTString = new Date().toGMTString();
        let ShaObj = new jsSHA('SHA-1', 'TEXT');
        ShaObj.setHMACKey(AppKey, 'TEXT');
        ShaObj.update('x-date: ' + GMTString);
        let HMAC = ShaObj.getHMAC('B64');
        let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
        return { 'Authorization': Authorization, 'X-Date': GMTString }; 
}