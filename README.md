![Preview](http://tenacity-statistics-rbx.astolfo.gay/preview.png?!)

# Tenacity Statistics

An attempt to remake the legendary [Tenacity 5.0](https://tenacity.dev) Statistics Module in Roblox

## Usage

###### Lua

```lua
-- Load TenacityStatistics
local TenacityStatistics = loadstring(game:HttpGetAsync'https://tenacity-statistics-rbx.astolfo.gay/public/loader.lua')();

-- Persist Playtime across teleports - Gets cancelled if gameclient restarts
TenacityStatistics.Utility:PersistPlaytime();

-- Define Slot Pairs (there are only 3 slots!) - 3rd argument is optional
TenacityStatistics:SetStatSlot(1,'Games Played',0);
TenacityStatistics:SetStatSlot(2,'K/D',0);
TenacityStatistics:SetStatSlot(3,'Kills',0);

-- Update the slots
TenacityStatistics:SetStat('Games Played',69);
```

###### TypeScript

TBA
