function html2adf(html){
  var documentFragment = createElementFromHTML(html);
  var jsonNodes = htmlToJsonNodes(documentFragment)          

  var adf = {
    "version": 1,
    "type": "doc",
    "content": jsonNodesToADF(jsonNodes)
  }
  return adf
}

function htmlToJsonNodes(obj){
    var node = {
      'name': obj.nodeName,
      'value': obj.nodeValue,
      'type': obj.nodeType,
      'children': [],
    }
    for (var i = 0; i< obj.childNodes.length;i++){
      node['children'].push(htmlToJsonNodes(obj.childNodes[i]))
    }
    if (obj.nodeName == "A") {
      node["href"] = obj.href
    }
    return node
  }

  function jsonNodesToADF(obj){
    var adf_contents = []
    if (obj.hasOwnProperty("name") && obj.hasOwnProperty("value") && obj.hasOwnProperty("type")) {
      var contents = jsonNodeToADF(obj)
      adf_contents = adf_contents.concat(contents)

      for (var i = 0 ; i < obj.children.length ; i++){
        var contents = jsonNodeToADF(obj.children[i])
        adf_contents = adf_contents.concat(contents)
      }
    }
    return adf_contents
  }

  function jsonNodeToADF(obj){
    var adf_contents = []

    // paragraph
    if (obj.name == "P" && obj.type == 1){
      var adf_obj = {
        "type": "paragraph",
        "content": [],
      }
      for (var i = 0 ; i < obj.children.length ; i++){
        var contents = jsonNodeToADF(obj.children[i])
        adf_obj["content"] = adf_obj["content"].concat(contents)
      }
      adf_contents.push(adf_obj)

    } else 
    
    // text
    if (obj.name == "#text" && obj.type == 3){
      var adf_obj = {
        "type": "text",
      }
      if (obj.value != "\n") {
        adf_obj["text"] = obj.value
        adf_contents.push(adf_obj)
      }

    } else

    // break new line
    if (obj.name == "BR" && obj.type == 1){
      var adf_obj = {
        "type": "hardBreak",
      }
      adf_contents.push(adf_obj)

    } else

    // bold
    if (obj.name == "STRONG" && obj.type == 1){
      for (var i = 0 ; i < obj.children.length ; i++){
        var contents = jsonNodeToADF(obj.children[i])
        for (var i = 0 ; i < contents.length ; i++){
          var contentItem = contents[i]
          if (!contentItem.hasOwnProperty("marks")){
            contentItem["marks"] = []
          }
          contentItem["marks"].push({
            "type": "strong",
          })
          adf_contents.push(contentItem)
        }
      }

    } else

    // italic
    if (obj.name == "EM" && obj.type == 1){
      for (var i = 0 ; i < obj.children.length ; i++){
        var contents = jsonNodeToADF(obj.children[i])
        for (var i = 0 ; i < contents.length ; i++){
          var contentItem = contents[i]
          if (!contentItem.hasOwnProperty("marks")){
            contentItem["marks"] = []
          }
          contentItem["marks"].push({
            "type": "em",
          })
          adf_contents.push(contentItem)
        }
      }

    } else 

    // strike
    if (obj.name == "S" && obj.type == 1){
      for (var i = 0 ; i < obj.children.length ; i++){
        var contents = jsonNodeToADF(obj.children[i])
        for (var i = 0 ; i < contents.length ; i++){
          var contentItem = contents[i]
          if (!contentItem.hasOwnProperty("marks")){
            contentItem["marks"] = []
          }
          contentItem["marks"].push({
            "type": "strike",
          })
          adf_contents.push(contentItem)
        }
      }

    } else

    // underline
    if (obj.name == "SPAN" && obj.type == 1){
      for (var i = 0 ; i < obj.children.length ; i++){
        var contents = jsonNodeToADF(obj.children[i])
        for (var i = 0 ; i < contents.length ; i++){
          var contentItem = contents[i]
          if (!contentItem.hasOwnProperty("marks")){
            contentItem["marks"] = []
          }
          contentItem["marks"].push({
            "type": "underline",
          })
          adf_contents.push(contentItem)
        }
      }

    } else 

    // superscript
    if (obj.name == "SUP" && obj.type == 1){
      for (var i = 0 ; i < obj.children.length ; i++){
        var contents = jsonNodeToADF(obj.children[i])
        for (var i = 0 ; i < contents.length ; i++){
          var contentItem = contents[i]
          if (!contentItem.hasOwnProperty("marks")){
            contentItem["marks"] = []
          }
          contentItem["marks"].push({
            "type": "subsup",
            "attrs": {
              "type": "sup"
            }
          })
          adf_contents.push(contentItem)
        }
      }

    } else

    // subscript
    if (obj.name == "SUB" && obj.type == 1){
      for (var i = 0 ; i < obj.children.length ; i++){
        var contents = jsonNodeToADF(obj.children[i])
        for (var i = 0 ; i < contents.length ; i++){
          var contentItem = contents[i]
          if (!contentItem.hasOwnProperty("marks")){
            contentItem["marks"] = []
          }
          contentItem["marks"].push({
            "type": "subsup",
            "attrs": {
              "type": "sub"
            }
          })
          adf_contents.push(contentItem)
        }
      }

    } else

    // code
    if (obj.name == "CODE" && obj.type == 1){
      for (var i = 0 ; i < obj.children.length ; i++){
        var contents = jsonNodeToADF(obj.children[i])
        for (var i = 0 ; i < contents.length ; i++){
          var contentItem = contents[i]
          if (!contentItem.hasOwnProperty("marks")){
            contentItem["marks"] = []
          }
          contentItem["marks"].push({
            "type": "code",
          })
          adf_contents.push(contentItem)
        }
      }

    } else

    // link
    if (obj.name == "A" && obj.type == 1){
      for (var i = 0 ; i < obj.children.length ; i++){
        var contents = jsonNodeToADF(obj.children[i])
        for (var i = 0 ; i < contents.length ; i++){
          var contentItem = contents[i]
          if (!contentItem.hasOwnProperty("marks")){
            contentItem["marks"] = []
          }
          contentItem["marks"].push({
            "type": "link",
            "attrs": {
              "href": obj.href
            }
          })
          adf_contents.push(contentItem)
        }
      }

    } else

    // headers
    if (obj.type == 1 && obj.name == "H1" || obj.name == "H2" || obj.name == "H3" || obj.name == "H4" || obj.name == "H5"){
      var adf_obj = {
        "type": "heading",
        "attrs": {
          "level": obj.name[1],
        },
        "content": [],
      }
      for (var i = 0 ; i < obj.children.length ; i++){
        var contents = jsonNodeToADF(obj.children[i])
        adf_obj["content"] = adf_obj["content"].concat(contents)
      }
      adf_contents.push(adf_obj)

    } else

    // unosorted list
    if (obj.name == "UL" && obj.type == 1){
      var adf_obj = {
        "type": "bulletList",
        "content": [],
      }
      for (var i = 0 ; i < obj.children.length ; i++){
        var contents = jsonNodeToADF(obj.children[i])
        adf_obj["content"] = adf_obj["content"] .concat(contents)
      }
      adf_contents.push(adf_obj)
      
    } else

    // order list
    if (obj.name == "OL" && obj.type == 1){
      var adf_obj = {
        "type": "orderedList",
        "content": [],
      }
      for (var i = 0 ; i < obj.children.length ; i++){
        var contents = jsonNodeToADF(obj.children[i])
        adf_obj["content"] = adf_obj["content"] .concat(contents)
      }
      adf_contents.push(adf_obj)
      
    } else

    // list item
    if (obj.name == "LI" && obj.type == 1){
      var adf_obj = {
        "type": "listItem",
        "content": [{
            "type": "paragraph",
            "content": [],
        }],
      }
      for (var i = 0 ; i < obj.children.length ; i++){
        var last_paragraph = adf_obj["content"].length - 1
        var contents = jsonNodeToADF(obj.children[i])
        if (contents.length > 0){
          adf_obj["content"][last_paragraph]["content"] = adf_obj["content"][last_paragraph]["content"].concat(contents)
        }
      }
      adf_contents.push(adf_obj)

    }

    return adf_contents
  }