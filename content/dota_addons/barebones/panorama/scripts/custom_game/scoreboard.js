function OnScoreUpdate(current){
	$.Msg("run", current);
	$("#ScoreDescription").text = current.score;
}


function debug(){
	GameEvents.Subscribe("update_score", OnScoreUpdate);
}

debug();