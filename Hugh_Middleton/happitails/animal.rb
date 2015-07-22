class Animal
  attr_accessor :name, :age, :gender, :species, :toys

  def initialize(details = {})
    if (!details[:name] || !details[:age] || !details[:gender] || !details[:species] || !details[:toys])
      puts "======================="
      puts "Animal Details Required"
      puts "======================="
    end

    if !details[:name]
      print "Name: "
      details[:name] = gets.chomp
    end

    if !details[:age]
      print "Age: "
      details[:age] = gets.chomp.to_i
    end

    if !details[:gender]
      print "Gender (m/f): "
      details[:gender] = gets.chomp
    end

    if !details[:species]
      print "Species: "
      details[:species] = gets.chomp
    end

    if !details[:toys]
      print "Toys (comma separated): "
      details[:toys] = gets.chomp.split(',')
    end

    @name = details[:name]
    @age = details[:age]
    @gender = details[:gender]
    @species = details[:species]
    @toys = details[:toys] || []
  end

  def to_s
    "Name: #{@name}\nAge: #{@age}\nGender: #{@gender}\nSpecies: #{@species}\nToys: #{@toys.join(', ')}"
  end
end
