# Monkey patch for kconv compatibility with Ruby 3.4+
# kconv was removed from Ruby 3.2+ standard library
# This must be loaded before CFPropertyList requires kconv

# Define Kconv module first
unless defined?(Kconv)
  module Kconv
    EUC = Encoding.find('EUC-JP') rescue Encoding::UTF_8
    SJIS = Encoding.find('Shift_JIS') rescue Encoding::UTF_8
    UTF8 = Encoding::UTF_8

    def self.toeuc(str)
      str.to_s.encode(EUC, UTF8)
    rescue
      str.to_s
    end

    def self.toutf8(str)
      str.to_s.encode(UTF8, EUC)
    rescue
      str.to_s.encode(UTF8)
    end

    def self.tosjis(str)
      str.to_s.encode(SJIS, UTF8)
    rescue
      str.to_s
    end
  end
end

# Intercept require to provide kconv stub
module Kernel
  alias_method :original_require, :require
  
  def require(name)
    if name == 'kconv'
      return true if defined?(Kconv)
    end
    original_require(name)
  rescue LoadError => e
    if e.message.include?('kconv')
      return true if defined?(Kconv)
    end
    raise e
  end
end

