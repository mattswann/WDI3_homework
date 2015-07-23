
## Comment
## Starbucks Homework
require 'pry'

class Coffee
  attr_accessor :type, :sugars, :size, :name

  def initialize(details = {})
    @type = details[:type] || "latte"
    @sugars = details[:sugars] || 1
    @size = details[:size] || "medium"
    @options = details[:options] || []
    @name = Barista.misspell(details[:name])
    @order_time = Time.now
    @ready_time = @order_time + (2 * 60) + (rand(3 * 60))
  end

  def to_s
    string = "#{@name}'s #{size} #{@type}"
    if @sugars > 0
      string += "#{", " + @sugars.to_s + " sugar" if @sugars > 0}#{"s" if @sugars > 1}"
    end
    string
  end

  def ready?
    Time.now >= @ready_time ? true : false
  end

  def collect
    @collected = true
  end

  def collected?
    @collected
  end

end


class Barista
  attr_accessor :orders

  def self.misspell(name)
    name_letters = name.split('')
    name_letters[rand(name_letters.size)] = ('a'..'z').to_a[rand(26)]
    name_letters.join
  end

  def initialize
    @orders = []
  end

  def order(details = {})
    @orders.push Coffee.new(details)
  end

  def orders_for_pickup
    @orders.select { |order| order.ready? && !order.collected? }
  end

  def call_out
    puts "Coffee Up!" if orders_for_pickup.count > 0
    orders_for_pickup.each do |order|
      sleep(0.5)
      print "~ "
      sleep(0.5)
      puts order.to_s
    end
    puts "Brew, brew, brew... "
  end

  def collected_orders
    @orders.select { |order| order.collected? }
  end

  def clear_collected_orders
    @orders.delete_if { |order| order.collected? }
  end
end
