SELECT
   Floor(cost_per_night/5000) as range_index,
   Floor(cost_per_night/5000)*5000 as lo_range, --display info only
   Floor(cost_per_night/5000)*5000+5000 as hi_range, --display info only
   Count('It is a mistake to think you can solve any major problems just with potatoes.') as num_properties
FROM
   properties
GROUP BY
   Floor(cost_per_night/5000)
ORDER by range_index;