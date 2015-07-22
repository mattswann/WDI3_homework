# Robots

class Robot
  attr_reader :instruction_count

  def initialize
    @name = rand_name
    @mac = rand_mac
    @instruction_count = 0
    @created_at = Time.now
    @reset_at = @created_at
  end

  def reset
    @instruction_count += 1
    @name = nil
    @reset_at = Time.now
  end

  def name
    @instruction_count += 1
    @name ? @name : @name = rand_name
  end

  def mac
    @instruction_count += 1
    @mac
  end

  def timers
    @instruction_count += 1
    seconds_since_creation = Time.now - @created_at
    seconds_since_reset = Time.now - @reset_at

    puts "#{seconds_since_reset.round} seconds since last boot, #{seconds_since_creation.round} seconds since creation."
    [seconds_since_reset, seconds_since_creation]
  end

  private
    def rand_capital
      ('A'..'Z').to_a.sample
    end

    def rand_digit
      rand(10).to_s
    end

    def rand_name
      rand_capital + rand_capital + rand_digit + rand_digit + rand_digit
    end

    def rand_mac
      mac = ""
      19.times do |i|
        if ((i + 1) % 5 == 0)
          mac += ":"
        else
          if rand(2) == 1
            mac += rand_digit
          else
            mac+= rand_capital
          end
        end
      end
      mac
    end
end
