/*
* Recommendation: use a collection of Records
* that manages collections of all Records, but used 
* by all other objects.
*/

function Record(){}


Record.recordKeys = function(){
  var name = this.name, keys;
  keys = localStorage[name+"Keys"];
  return keys? JSON.parse(localStorage[name + "Keys"]): null;
};

Record.makeKey = function(){
  var keys = this.recordKeys(), name = this.name;

  if(keys) {
    var length = keys.length || 1, last = length - 1;
    newKey = keys[last] + 1;
  } else {
    newKey = 1;
    keys = [newKey];
    localStorage[name+"Keys"] = JSON.stringify(keys);
  }
  
  while(localStorage[name+newKey] !== undefined){
    newKey += 1;
  }

  return newKey;
};

Record.addObject = function(newObject){
  var name = this.name, keys, newKey;

  newKey = this.makeKey();
  keys = this.recordKeys();

  keys.push(newKey);
  localStorage[name+newKey] = JSON.stringify(newObject);
  newObject.getKey = function(){return newKey};
  
  return newObject;
};

Record.all = function(){
  var name, records, keys;
  
  records = [];
  name = this.name,
  keys = this.recordKeys();

  if(keys){
    for(var index = 0, key, record; index < keys.length; index++){
      key = keys[index]
      record = localStorage[name+key];
      record.getKey = function(){return key;}
      records.push(record);
    }
  } 
  return records;
}



Record.create = function(params){
  var name = this.name, newKey,
    newRecord;

  newRecord = new this(params);
  return this.addObject(newRecord);
};

Record.prototype.save = function(){
  var name = this.constructor.name, key;

  if(!!this.getKey){
    key = this.getKey();
    localStorage[name+key] = JSON.stringify(this);
  } else {
    this.constructor.addObject(this);
  }

  return this;
};


