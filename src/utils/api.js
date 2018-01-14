import request from 'superagent';

function getDataWithId(id) {
  return new Promise((resolve) => {
    return request.get('https://content-wcef.herokuapp.com/content/' + id)
      .accept('json')
      .then((res) => {
        return resolve ({
          contractAddress: res.body.contract_address,
          url: res.body.file_url,
          price: res.body.price_in_wei
        });
      })
      .catch(function(err){
        console.log("error caught: " + err);
      });
  });
}

function postData(body) {
  return new Promise((resolve) => {
    return request.post('https://content-wcef.herokuapp.com/content')
      .send(body)
      .accept('json')
      .then(res => {
        return resolve(res.body);
      })
      .catch(err => console.log(err));
  });
}

export default { getDataWithId, postData };
