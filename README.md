# ![Preview](http://tenacity-statistics-rbx.astolfo.gay/preview.png?!)

# Tenacity Statistics

An attempt to remake the legendary [Tenacity 5.0](https://tenacity.dev) Statistics Module in Roblox

## Usage

### Lua

###### General Example

```lua
-- Load TenacityStatistics
local TenacityStatistics = loadstring(game:HttpGetAsync'https://tenacity-statistics-rbx.astolfo.gay/public/loader.lua')();

-- Persist Playtime across teleports - Gets cancelled if gameclient restarts
TenacityStatistics.Utility:PersistPlaytime(); -- WIP | UNTESTED

-- Define Slot Pairs (there are only 3 slots!) - 3rd argument is optional
TenacityStatistics:SetStatSlot(1,'Games Played',0);
TenacityStatistics:SetStatSlot(2,'K/D',0);
TenacityStatistics:SetStatSlot(3,'Kills',0);

-- Update the slots
TenacityStatistics:SetStat('Games Played',69);
```

###### Driving Empire Example

```lua
-- Load TenacityStatistics
local TenacityStatistics = loadstring(game:HttpGetAsync'https://tenacity-statistics-rbx.astolfo.gay/public/loader.lua')();

-- Get Leaderstats
local LeaderStats = game:GetService'Players'.LocalPlayer:WaitForChild'leaderstats'

-- Define Starting Values
TenacityStatistics:SetStatSlot(1,'Money Earnt',0)
TenacityStatistics:SetStatSlot(2,'Miles Driven',0)
TenacityStatistics:SetStatSlot(3,'Bounty Earned',0)

-- Define Value Objects
local StatPairs = {
  ['Money Earnt'] = LeaderStats.Cash;
  ['Miles Driven'] = LeaderStats.Miles;
  ['Bounty Earned'] = LeaderStats.Bounty;
}

-- Define Starting Values & Connect
local startingValues = {};
for k,v in pairs(StatPairs) do
  startingValues[k] = v.Value;
  v.Changed:Connect(function()
    TenacityStatistics:SetStat(k,v.Value - startingValues[k])
  end)
end;
```

### TypeScript

TBA
