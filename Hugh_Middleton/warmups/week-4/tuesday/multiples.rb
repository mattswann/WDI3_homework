## sum of multiples
#
# multiples of 3 and 5, up to 10 = 3, 5, 6, 9
# total = 23

# 2 numbers = a & b
# up to 'max'

def sum_of_multiples a, b, max
  set = []

  (a..max).step(a) do |n|
    set.push n
  end

  (b..max).step(b) do |n|
    set.push n unless set.include? n
  end

  set.sort!
  total = set.reduce :+

  50.times do
    print "-"
    sleep 0.02
  end
  print "\n"
  puts "finding all multiples of #{a} and #{b} up to #{max}..."
  set.each do |n|
    sleep 0.3
    print "#{n}, "
  end
  sleep 0.5
  puts "total is #{total}"

  total
end

sum_of_multiples 3, 5, 10
sum_of_multiples 4, 7, 43
