if not game:IsLoaded() then game.Loaded:Wait() end
if getgenv and getgenv().TenacityStatistics or _G.TenacityStatistics then
  return getgenv and getgenv().TenacityStatistics or _G.TenacityStatistics
end
local raw = game:HttpGetAsync('https://tenacity-statistics-rbx.astolfo.gay/public/script.lua');
local script, err = loadstring(raw);
if err and (not script or typeof(script) == 'string') then error('Error while loading: ', err) end
script()
return getgenv and getgenv().TenacityStatistics or _G.TenacityStatistics;
