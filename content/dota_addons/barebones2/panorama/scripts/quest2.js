var quests = {};
function InitQuest(name, desc, target){
  var panel = $.CreatePanel("Panel", $("#Quests"), "");
  panel.BLoadLayoutSnippet("Quest");
  panel.FindChildTraverse("QuestTitle").text = name;
  panel.FindChildTraverse("QuestDescription").text = desc;
  panel.name = name;
  panel.desc = desc;
  SetQuestProgress(panel, 0, target);
  return panel;
}

function SetQuestProgress(quest, current, goal){
  var percent = (current / goal);
  quest.FindChildTraverse("QuestProgress").text = current + "/" + goal;
  var background = quest.FindChildTraverse("Background");
  background.style.width = (percent * 100) + "%";
  quest.goal = goal;
  quest.current = current;
}
function RemoveQuest(quest){
  quest.DeleteAsync(0);
}
function OnNewQuest(dat){
  var quest = InitQuest(dat.name, dat.desc, dat.max);
  quest.tag = dat.id;
  quests[dat.id] = quest;
}
function OnQuestUpdateProgress(dat){
  for(var x in quests){
    quest = quests[x];
    if(quest.tag == dat.id){
      SetQuestProgress(quest, dat.current, dat.max);
      break;
    }
  }
}
function OnQuestRemove(dat){
  for(var x in quests){
    quest = quests[x];
    if(quest.tag == dat.id){
      RemoveQuest(quest);
      break;
    }
  }
}
function debug(){
  GameEvents.Subscribe("quests_create_quest", OnNewQuest);
  GameEvents.Subscribe("quests_update_quest", OnQuestUpdateProgress);
  GameEvents.Subscribe("quests_remove_quest", OnQuestRemove);
}
debug();
