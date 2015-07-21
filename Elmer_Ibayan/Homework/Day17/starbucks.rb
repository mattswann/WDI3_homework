require 'pry'

class Order

  def initialize(type, size, sugar_amount, name)
    @type = type
    @sugar_amount = sugar_amount.to_s + "sugars"
    @size = size
    @name = name 
    @waiting_time = 0
    @options = ''
    @collected = false
  end

  def ready(time_lapse)
    if @waiting_time <= time_lapse
      return "Ready"
    else
      return "In progress"
    end
  end

  def set_collected(status)
    @collected = status
  end

  def get_collected()
    return @collected
  end

  def set_options(option)
    @options = option
  end

  def set_waiting_time(waiting_time)
    @waiting_time = waiting_time
  end

  def get_options
    return @options
  end

  def get_type
    return @type
  end

  def get_sugar_amount
    return @sugar_amount
  end

  def get_size
    return @size
  end

  def get_name
    return @name #you should add something that spells the name wrong something like-->   name.gsub(/[aeiouy]/, %w(a e i o u y).sample)
  end

  def get_waiting_time
    return @waiting_time
  end

  # def get_all_info
  #   return "#{@name.capitalize}'s #{@type}, #{@size}, #{@sugar_amount}."
  # end
end

def user_input(message)
  print (message)
  return gets.chomp.to_s
end

def user_prompt()
puts " " #spacer
print ("      What do you want to do next? 
                 1: take new customer
                 2: order collection
                 3: exit 
             Reply: > ")
  return gets.chomp.to_i
end


exit = "no"
# Order collection
while exit == "no"
  puts "         ------------------------------------ " 
  puts "        |     WELCOME TO ViiMinds CAFE       |"
  puts "         ------------------------------------ "
  order = user_input("     Key-in the next customer no.: ")
  type = user_input("     Key-in the order: latte / expresso / black / etc: ")
  size = user_input("     What's the size of coffee? : tall / medium / grande / na: ")
  sugar_amount = user_input("     How much sugar?: 2 / 3 / 4:  ")
  name = user_input("     What's the customer name?: ")
  order_name = "order" + order
  customer = "order" + order
  customer = Order.new(type, size, sugar_amount, name)
  
  options = user_input("     Any options? hazelnut / whipped cream / chocolate syrup / none: ")
  customer.set_options(options)
  waiting_time = user_input("     Waiting time will be in (mins):  ")

  puts    "*-----------------------------------------------*"
  puts    "|                   ORDER SUMMARY:              |"
  puts    "|_______________________________________________|"
  puts    " *   Order no: #{order_name}"
  puts    " *   Type: #{type} "
  puts    " *   Size: #{size}  "
  puts    " *   Sugar Qty: #{sugar_amount}"
  puts    " *   Name: #{name} "
  puts    " *   Options: #{options} "
  puts    " *   Be ready in: #{waiting_time} mins "
  puts    " *   Order collected: #{customer.get_collected} "
  puts    " *______________________________________________"
  puts " " #spacer

  response = user_prompt

  if response == 3
    exit = "yes"
  elsif response == 2
    customer.set_collected(true)

puts      "*-----------------------------------------------*"
    puts  "|                   ORDER SUMMARY:              |"
  puts    "|_______________________________________________|"
  puts    " *   Order no: #{order_name}"
  puts    " *   Type: #{type} "
  puts    " *   Size: #{size}  "
  puts    " *   Sugar Qty: #{sugar_amount}"
  puts    " *   Name: #{name} "
  puts    " *   Options: #{options} "
  puts    " *   Be ready in: #{waiting_time} mins "
  puts    " *   Order collected: #{customer.get_collected} "
  puts    " _______________________________________________"
  puts " " #spacer

    exit = "no"
  else
    exit = "no"  
  end
end

