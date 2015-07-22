class Shelter
  attr_accessor :clients, :animals

  def initialize(name)
    @clients = []
    @animals = []
    @name = name
  end

  def add_animal
    @animals << Animal.new
  end

  def add_client
    @clients << Client.new
  end

  def main_menu
    puts ""
    sleep(0.1)
    puts ""
    sleep(0.1)
    puts ""
    sleep(0.1)
    puts " ---------------------------------------- "
    sleep(0.1)
    puts "|                                        |"
    sleep(0.1)
    puts "|         Welcome to #{@name}!         |"
    sleep(0.1)
    puts "|                                        |"
    sleep(0.1)
    puts " ---------------------------------------- "
    sleep(0.1)
    puts "| [1] Add New Client                     |"
    sleep(0.1)
    puts "| [2] Add New Animal                     |"
    sleep(0.1)
    puts "| [3] List All Clients                   |"
    sleep(0.1)
    puts "| [4] List All Animals                   |"
    sleep(0.1)
    puts "|                                        |"
    sleep(0.1)
    puts "| [5] Quit                               |"
    sleep(0.1)
    puts "|                                        |"
    sleep(0.1)
    puts " ---------------------------------------- "
    puts ""
    sleep(0.1)
    puts ""
    sleep(0.1)
    puts ""
  end

  def client_menu
    puts ""
    sleep(0.1)
    puts " ---------------------------------------- "
    sleep(0.1)
    puts "|                                        |"
    sleep(0.1)
    puts "|              Client List               |"
    sleep(0.1)
    puts "|                                        |"
    sleep(0.1)
    puts " ---------------------------------------- "
    sleep(0.1)
    clients.each_with_index do |client, index|
      puts "| [#{index + 1}] #{client.name}"
      sleep(0.1)
    end
    puts "|                                        |"
    sleep(0.1)
    puts "| [#{@clients.count + 1}] Back                               |"
    sleep(0.1)
    puts "|                                        |"
    sleep(0.1)
    puts " ---------------------------------------- "
    puts ""
  end

  def animal_menu
    puts ""
    sleep(0.1)
    puts " ---------------------------------------- "
    sleep(0.1)
    puts "|                                        |"
    sleep(0.1)
    puts "|              Animal List               |"
    sleep(0.1)
    puts "|                                        |"
    sleep(0.1)
    puts " ---------------------------------------- "
    sleep(0.1)
    animals.each_with_index do |animal, index|
      puts "| [#{index + 1}] #{animal.name}"
      sleep(0.1)
    end
    puts "|                                        |"
    sleep(0.1)
    puts "| [#{@animals.count + 1}] Back                               |"
    sleep(0.1)
    puts "|                                        |"
    sleep(0.1)
    puts " ---------------------------------------- "
    puts ""
  end
  # def list_clients
  #   puts ""
  #   sleep(0.1)
  #   puts ""
  #   sleep(0.1)
  #   puts ""
  #   sleep(0.1)
  #   puts "No clients to display." if clients.count == 0
  #   clients.each do |client|
  #     puts client
  #     sleep(0.5)
  #     puts ""
  #     sleep(0.1)
  #     puts ""
  #   end
  # end

end
