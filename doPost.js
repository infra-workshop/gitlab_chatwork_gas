function doPost(e) {
  var data = JSON.parse(e.postData.getDataAsString());
  var message = GitlabChatwork.constructChatworkMessageFromGitLab(data);

  GitlabChatwork.setChatworkAPIKey(PropertiesService.getScriptProperties().getProperty('CHATWORK_API_KEY'));
  GitlabChatwork.setChatworkRoomId(PropertiesService.getScriptProperties().getProperty('CHATWORK_ROOM_ID'));
  GitlabChatwork.setChatWorkClient(ChatWorkClient);
  GitlabChatwork.sendMessageToChatwork(message);
}
