--Matches by tier and patch
SELECT
match_id,
duration,
patch,
leagues.name leaguename
FROM matches
JOIN match_patch using(match_id)
JOIN leagues using(leagueid)
WHERE leagues.tier = 'premium'
AND patch = '7.31'
ORDER BY match_id DESC


SELECT match_id, duration, start_time,
radiant_team_id, radiant.name as radiant_name,
dire_team_id, dire.name as dire_name,
leagueid, leagues.name as league_name,
series_id, series_type,
radiant_score, dire_score,
radiant_win
FROM matches
LEFT JOIN teams radiant
ON radiant.team_id = matches.radiant_team_id
LEFT JOIN teams dire
ON dire.team_id = matches.dire_team_id
LEFT JOIN leagues USING(leagueid)
ORDER BY match_id DESC
LIMIT 100

SELECT
matches.match_id,
matches.duration,
matches.radiant_team_id,
matches.dire_team_id,
teams.name,
((player_matches.player_slot < 128) = matches.radiant_win) win,
player_matches.hero_id,
player_matches.account_id,
leagues.name leaguename,
leagues.tier,
match_patch
FROM matches
JOIN match_patch using(match_id)
JOIN leagues using(leagueid)
JOIN player_matches using(match_id)
JOIN heroes on heroes.id = player_matches.hero_id
LEFT JOIN notable_players ON notable_players.account_id = player_matches.account_id
LEFT JOIN teams using(team_id)
WHERE TRUE
AND leagues.tier = 'premium'
AND patch = '7.31'
-- AND (matches.leagueid = 14173)
-- GROUP BY matches.match_id
ORDER BY matches.match_id DESC

SELECT
matches.match_id,
matches.duration,
player_matches.hero_id
FROM matches
JOIN match_patch using(match_id)
JOIN leagues using(leagueid)
JOIN player_matches using(match_id)
JOIN heroes on heroes.id = player_matches.hero_id
LEFT JOIN notable_players ON notable_players.account_id = player_matches.account_id
LEFT JOIN teams using(team_id)
WHERE TRUE
AND leagues.tier = 'premium'
AND patch = '7.31'
ORDER BY matches.match_id DESC
GROUP BY player_matches.hero_id DESC


--Matches Hero total time and number played
SELECT
player_matches.hero_id,
SUM(matches.duration),
COUNT(player_matches.hero_id) as total
FROM matches
JOIN match_patch using(match_id)
JOIN leagues using(leagueid)
JOIN player_matches using(match_id)
JOIN heroes on heroes.id = player_matches.hero_id
LEFT JOIN notable_players ON notable_players.account_id = player_matches.account_id
LEFT JOIN teams using(team_id)
WHERE TRUE
AND leagues.tier = 'premium'
AND patch = '7.31'
GROUP BY player_matches.hero_id 
ORDER BY total DESC

