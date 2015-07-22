# HappiTails
require_relative 'animal'
require_relative 'client'
require_relative 'shelter'

ht = Shelter.new "HappiTails"

ht.main_menu
print "Enter Selection: "
selection = gets.chomp.to_i

while selection != 5

  if selection == 1
    # Add new client
    ht.add_client
    puts "\n\n\n"
    puts "Client Added."
  elsif selection == 2
    # Add new animal
    ht.add_animal
    puts "\n\n\n"
    puts "Animal Added."
  elsif selection == 3
    # List all clients
    ht.client_menu
    print "Enter Selection: "
    selection = gets.chomp.to_i

    while selection != (ht.clients.count + 1)

      puts ""
      sleep(0.1)
      puts ""
      sleep(0.1)
      puts ""
      sleep(0.1)
      puts ht.clients[selection - 1]
      sleep(0.5)
      puts ""
      sleep(0.1)
      puts ""

      ht.client_menu
      print "Enter Selection: "
      selection = gets.chomp.to_i
    end
  elsif selection == 4
    # List all animals
    ht.animal_menu
    print "Enter Selection: "
    selection = gets.chomp.to_i

    while selection != (ht.animals.count + 1)

      puts ""
      sleep(0.1)
      puts ""
      sleep(0.1)
      puts ""
      sleep(0.1)
      puts ht.animals[selection - 1]
      sleep(0.5)
      puts ""
      sleep(0.1)
      puts ""

      ht.animal_menu
      print "Enter Selection: "
      selection = gets.chomp.to_i
    end
  end

  ht.main_menu
  print "Enter Selection: "
  selection = gets.chomp.to_i
end
