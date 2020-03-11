import React from "react";

var options = {
    method: 'GET',
    url: 'http://beta-api.sitrack.io/edna/Issue',
    headers: { 'content-type': 'application/json', Authorization: 'basic Z3VpbGhlcm1lLmJldGE6YmV0YQ==' }
};
 fetch("url", options)
    .then(res => { console.log(res) }); 