SELECT
  case
    when cost_per_night between     0 and  5000 then '$ 0-50'
    when cost_per_night between  5001 and 10000 then '$ 051-100'
    when cost_per_night between 10001 and 15000 then '$ 101-150'
    when cost_per_night between 15001 and 20000 then '$ 151-200'
    when cost_per_night between 20001 and 25000 then '$ 201-250'
    when cost_per_night between 25001 and 30000 then '$ 251-300'
    when cost_per_night between 30001 and 35000 then '$ 301-350'
    when cost_per_night between 35001 and 40000 then '$ 351-400'
    when cost_per_night between 40001 and 45000 then '$ 401-450'
    when cost_per_night between 45001 and 50000 then '$ 451-500'
    when cost_per_night between 50001 and 55000 then '$ 501-550'
    when cost_per_night between 55001 and 60000 then '$ 551-600'
    when cost_per_night between 60001 and 65000 then '$ 601-650'
    when cost_per_night between 65001 and 70000 then '$ 651-700'
    when cost_per_night between 70001 and 75000 then '$ 701-750'
    when cost_per_night between 75001 and 80000 then '$ 751-800'
    when cost_per_night between 80001 and 85000 then '$ 801-850'
    when cost_per_night between 85001 and 90000 then '$ 851-900'
    when cost_per_night between 90001 and 95000 then '$ 901-950'
    when cost_per_night between 95001 and 100000 then '$ 951-1000'
    when cost_per_night > 100001 then '1001+'
    else 'OTHERS'
  end as "price_range",
  count('the answer is 42') as "num_properties"
FROM properties
GROUP BY "price_range"
ORDER BY "price_range";