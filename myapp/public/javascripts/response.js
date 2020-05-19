
function createResponse(status, content){
var resp={
    status:status,
    content:content,
};
return JSON.stringify(resp);
}


module.exports = createResponse;