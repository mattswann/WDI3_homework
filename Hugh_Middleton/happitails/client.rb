class Client
  attr_accessor :name, :children, :age, :pets

  def initialize(details = {})
    if (!details[:name] || !details[:children] || !details[:age] || !details[:pets])
      puts "======================="
      puts "Client Details Required"
      puts "======================="
    end

    if !details[:name]
      print "Name: "
      details[:name] = gets.chomp
    end

    if !details[:children]
      print "Number of Children: "
      details[:children] = gets.chomp.to_i
    end

    if !details[:age]
      print "Age: "
      details[:age] = gets.chomp.to_i
    end

    if !details[:pets]
      print "Number of Pets: "
      details[:pets] = []
      gets.chomp.to_i.times do
        details[:pets] << Animal.new
      end
    end

    @name = details[:name]
    @children = details[:children]
    @age = details[:age]
    @pets = details[:pets] || []

  end

  def to_s
    "Name: #{@name}\nChildren: #{@children}\nAge: #{@age}\nPets: #{@pets.count}"
  end

end
