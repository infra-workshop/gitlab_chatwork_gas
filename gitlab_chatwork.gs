var CHATWORK_API_KEY = '';
var CHATWORK_ROOM_ID = '';
var ChatWorkClient = ChatWorkClient;

function setChatworkAPIKey(key) {
  CHATWORK_API_KEY = key;
}

function setChatworkRoomId(id) {
  CHATWORK_ROOM_ID = id;
}

function setChatWorkClient(client) {
  ChatWorkClient = client;
}

function sendMessageToChatwork(message) {
  var client = ChatWorkClient.factory({token: CHATWORK_API_KEY});
  client.sendMessage({room_id: CHATWORK_ROOM_ID, body: message});
}

function constructChatworkMessageFromGitLab(data) {
  var title = data['object_attributes']['url'] + ' is updated by ' + data['user']['name'];
  var message = '';
  switch (true) {
    case data['object_kind'] == 'wiki_page':
      message = constructChatworkMessageFromGitLabWiki(data);
      break;
    case data['object_kind'] == 'note':
      message = constructChatworkMessageFromGitLabNote(data);
      break;
    case data['object_kind'] == 'issue':
      message = constructChatworkMessageFromGitLabIssue(data);
      break;
    default:
      message = 'not implemented' + JSON.stringify(data);
      break;
  }
  return '[info][title]' + title + '[/title]' + message + '[/info]';
}

function constructChatworkMessageFromGitLabWiki(data) {
  return data['object_attributes']['content'];
}

function constructChatworkMessageFromGitLabNote(data) {
  if('issue' in data) {
    return data['issue']['description'];
  }
  return data['object_attributes']['note'];
}

function constructChatworkMessageFromGitLabIssue(data) {
  return data['object_attributes']['description'];
}
