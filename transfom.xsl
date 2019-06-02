<xsl:stylesheet version="1.0"
		xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:template match="/">
    <html>
      <body>
	<h1 style="text-align:center">Wypożyczalnia</h1>
	<xsl:apply-templates/>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="employees">
    <h2 style="text-align:center">Pracownicy</h2>
    <table style="width:100%; text-align:center" border="1" bgcolor="#ffffe6">
      <tr>
	<th>ID</th>
	<th>Imię</th>
	<th>Nazwisko</th>
	<th>Data zatrudnienia</th>
	<th>Nr telefonu</th>
      </tr>
      <xsl:for-each select="employee">
	<tr>
	  <td><xsl:value-of select="@empId"/></td>
	  <td><xsl:value-of select="firstName"/></td>
	  <td><xsl:value-of select="lastName"/></td>
	  <td><xsl:value-of select="employmentDate"/></td>
	  <td><xsl:value-of select="contactPhone"/></td>
	</tr>
      </xsl:for-each>
    </table>
  </xsl:template>


  <xsl:template match="cars">
    <h2 style="text-align:center">Samochody</h2>
    <table style="width:100%; text-align:center" border="1" bgcolor="#ffffe6">
      <tr>
	<th>ID</th>
	<th>Typ nadwozia</th>
	<th>Nr rejestracyjny</th>
	<th>Marka</th>
	<th>Model</th>
	<th>Rocznik</th>
	<th>Paliwo</th>
	<th>Silnik</th>
	<th>Średnie spalanie [l/100km]</th>
	<th>Cena za dzień</th>
	<th>Cena za godzinę</th>
	<th>Dostępny?</th>
	<th>Odpowiedzialny pracownik</th>
      </tr>
      <xsl:for-each select="car">
	<tr>
	  <td><xsl:value-of select="@carId"/></td>
	  <td><xsl:value-of select="@type"/></td>
	  <td><xsl:value-of select="registration"/></td>
	  <td><xsl:value-of select="brand"/></td>
	  <td><xsl:value-of select="model"/></td>
	  <td><xsl:value-of select="model/@year"/></td>
	  <td><xsl:value-of select="engine/@fuel"/></td>
	  <td><xsl:apply-templates select="engine"/></td>
	  <td><xsl:apply-templates select="engine/avgFuelUsage"/></td>
	  <td><xsl:value-of select="rentalPrice/perDay"/>zł</td>
	  <td><xsl:value-of select="rentalPrice/perHour"/>zł</td>
	  <td><xsl:value-of select="availability"/></td>
	  <td><xsl:apply-templates select="respEmployeeId"/></td>
	</tr>
      </xsl:for-each>
    </table>
  </xsl:template>

  <xsl:template match="engine">
    <xsl:value-of select="size"/>
    <xsl:value-of select="size/@unit"/>
    &#160;<xsl:value-of select="type"/>
    &#160;<xsl:value-of select="power"/>
    &#160;<xsl:value-of select="power/@unit"/>
  </xsl:template>

  <xsl:template match="engine/avgFuelUsage">
    <xsl:if test="city != '' and road != '' and mixed !=''">
      Miasto: <xsl:value-of select="city"/>;&#160;
      Trasa: <xsl:value-of select="road"/>;&#160;
      Mieszane: <xsl:value-of select="mixed"/>;&#160;
    </xsl:if>
    <xsl:if test="not(city) and road != '' and mixed !=''">
      Miasto: brak danych;
      &#160;Trasa: <xsl:value-of select="road"/>;&#160;
      Mieszane: <xsl:value-of select="mixed"/>;&#160;
    </xsl:if>
    <xsl:if test="not(city) and not(road) and mixed !=''">
      Miasto: brak danych;
      Trasa: brak danych;
      Mieszane: <xsl:value-of select="mixed"/>;&#160;
    </xsl:if>
    <xsl:if test="not(city) and not(road) and not(mixed)">
      Brak danych
    </xsl:if>
    <xsl:if test="city != '' and not(road) and mixed !=''">
      Miasto: <xsl:value-of select="city"/>;&#160;
      Trasa: brak danych;
      Mieszane: <xsl:value-of select="mixed"/>;&#160;
    </xsl:if>
  </xsl:template>

  <xsl:key name="1stName" match="employee" use="@empId"/>
  <xsl:key name="lastName" match="employee" use="@empId"/>

  <xsl:template match="respEmployeeId">
    ID: <xsl:value-of select="@empId"/>;&#160;
    <xsl:if test="@empId = 'e1'">
      <xsl:for-each select="key('1stName','e1')">
	<xsl:value-of select="firstName"/>&#160;
      </xsl:for-each>
      <xsl:for-each select="key('1stName','e1')">
	<xsl:value-of select="lastName"/>
      </xsl:for-each>
    </xsl:if>
    <xsl:if test="@empId = 'e2'">
      <xsl:for-each select="key('1stName','e2')">
	<xsl:value-of select="firstName"/>&#160;
      </xsl:for-each>
      <xsl:for-each select="key('1stName','e2')">
	<xsl:value-of select="lastName"/>
      </xsl:for-each>
    </xsl:if>
  </xsl:template>

  <xsl:template match="clients">
    <h2 style="text-align:center">Klienci</h2>
    <table style="width:100%; text-align:center" border="1" bgcolor="#ffffe6">
      <tr>
	<th>ID</th>
	<th>Imię</th>
	<th>Nazwisko</th>
	<th>Nazwa firmy</th>
	<th>Nr telefonu</th>
      </tr>
      <xsl:apply-templates select="client"/>
    </table>
  </xsl:template>

  <xsl:template match="client">
    <tr>
      <td><xsl:value-of select="@clientId"/></td>
      <td><xsl:value-of select="clientFirstName"/></td>
      <td><xsl:value-of select="clientLastName"/></td>
      <td>  
        <xsl:if test="companyName != ''">
          <xsl:value-of select="companyName"/>
        </xsl:if>
        <xsl:if test="not(companyName)">
          nie dotyczy
        </xsl:if>
      </td>
      <td><xsl:value-of select="clientContactPhone"/></td>
    </tr>
  </xsl:template>
  <xsl:template match="reservations">
    <h2 style="text-align:center">Rezerwacje</h2>
    <table style="width:100%; text-align:center" border="1" bgcolor="#ffffe6">
      <tr>
	<th>ID</th>
	<th>Data</th>
	<th>Godzina</th>
	<th>ID samochodu</th>
	<th>ID klienta</th>
	<th>Kaucja</th>
	<th>Cena</th>
      </tr>
      <xsl:apply-templates select="reservation"/>
    </table>
  </xsl:template>

  <xsl:template match="reservation">
    <tr>
      <td><xsl:value-of select="@resId"/></td>
      <xsl:if test="not(date1) and not(date2)">
	<td><xsl:value-of select="date"/></td>
	<td>
	  Od: <xsl:value-of select="hour1"/>;
	  Do: <xsl:value-of select="hour2"/>
	</td>
      </xsl:if>
      <xsl:if test="not(date)">
	<td>
	  Od: <xsl:value-of select="date1"/>;
	  Do: <xsl:value-of select="date2"/>
	</td>
	<td>nie dotyczy</td>
      </xsl:if>
      <td><xsl:value-of select="carId/@carId"/></td>
      <td><xsl:value-of select="clientId/@clientId"/></td>
      <td><xsl:value-of select="deposit"/></td>
      <td><xsl:value-of select="price"/></td>
    </tr>
  </xsl:template>
</xsl:stylesheet>
