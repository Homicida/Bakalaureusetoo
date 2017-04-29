SPAWNLOCATIONDIRE = "customspawndire"
SPAWNLOCATIONRADIANT = "customspawnradiant"

if customSpawn == nil then
	customSpawn = class({})
end

function Precache(context)
	PrecacheUnitByNameSync( "npc_dota_creep_badguys_melee", context)
	PrecacheModel( "npc_dota_creep_badguys_melee", context )
	PrecacheUnitByNameSync( "npc_dota_neutral_kobold", context)
	PrecacheModel( "npc_dota_neutral_kobold", context )
end

function customSpawn:spawnunits()
	local spawnLocationDire = Entities:FindByName(nil, SPAWNLOCATIONDIRE)
	local creature = CreateUnitByName("npc_dota_creep_badguys_melee", spawnLocationDire:GetAbsOrigin(), true, nil, nil, DOTA_TEAM_BADGUYS)
	local i = 0
	local spawnLocationRadiant = Entities:FindByName(nil, SPAWNLOCATIONRADIANT)
	print("TEST creature: ")
	print(tostring(creature))
	while i < 5 do
		local creature2 = CreateUnitByName("npc_dota_neutral_kobold", spawnLocationRadiant:GetAbsOrigin(), true, nil, nil, DOTA_TEAM_BADGUYS)
		i = i + 1
	end
	
end

function Activate()
	GameRules.customSpawn = customSpawn()
	GameRules.customSpawn:InitGameMode()
end

function customSpawn:InitGameMode()
	GameRules:GetGameModeEntity():SetThink("spawnunits", self)
end
